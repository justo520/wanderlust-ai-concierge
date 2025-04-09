
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ShoppingCart, Calendar, DollarSign, X, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  type?: 'product' | 'booking' | 'bargain' | 'normal';
  metadata?: any;
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type Booking = {
  id: string;
  destination: string;
  date: string;
  price: number;
};

type Bargain = {
  id: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  item: string;
};

// Demo products for the chatbot to offer
const demoProducts: Product[] = [
  {
    id: 'p1',
    name: 'Travel Adapter',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'p2',
    name: 'Packing Cubes Set',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=400&auto=format&fit=crop&q=80'
  }
];

// Demo bookings for the chatbot to offer
const demoBookings: Booking[] = [
  {
    id: 'b1',
    destination: 'Bali Beach Resort',
    date: 'June 10-17, 2025',
    price: 1299
  },
  {
    id: 'b2',
    destination: 'Tokyo Adventure Tour',
    date: 'July 15-25, 2025',
    price: 1899
  }
];

// Demo bargains for the chatbot to offer
const demoBargains: Bargain[] = [
  {
    id: 'bg1',
    originalPrice: 1299,
    discountedPrice: 1099,
    discount: 15,
    item: 'Bali Beach Resort'
  }
];

interface AIChatProps {
  onClose: () => void;
}

export default function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m your Wanderlust AI assistant. I can help you discover destinations, find travel packages, add products to your cart, and even negotiate prices! How can I assist you today?',
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1500); // Simulate typing delay
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Process the message to detect what the user wants
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('destination') || lowercaseInput.includes('travel to') || lowercaseInput.includes('visit')) {
      simulateTyping(() => handleDestinationQuery(lowercaseInput));
    } else if (lowercaseInput.includes('product') || lowercaseInput.includes('buy') || lowercaseInput.includes('shop')) {
      simulateTyping(() => handleProductQuery());
    } else if (lowercaseInput.includes('book') || lowercaseInput.includes('reservation') || lowercaseInput.includes('package')) {
      simulateTyping(() => handleBookingQuery());
    } else if (lowercaseInput.includes('bargain') || lowercaseInput.includes('discount') || lowercaseInput.includes('deal') || lowercaseInput.includes('cheaper')) {
      simulateTyping(() => handleBargainQuery());
    } else {
      simulateTyping(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "I'm here to help with travel planning! You can ask me about destinations, products for your trip, making bookings, or finding special deals and discounts. What would you like to know?",
          isBot: true
        }]);
      });
    }
  };

  const handleDestinationQuery = (query: string) => {
    // A simple destination recommendation based on user input
    let destination = 'Bali';
    
    if (query.includes('beach') || query.includes('relax')) {
      destination = 'Bali';
    } else if (query.includes('city') || query.includes('culture')) {
      destination = 'Tokyo';
    } else if (query.includes('europe') || query.includes('island')) {
      destination = 'Santorini';
    }
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: `${destination} is a fantastic choice! It's one of our most popular destinations. Would you like me to show you some travel packages for ${destination}?`,
      isBot: true
    }]);
  };

  const handleProductQuery = () => {
    const products = demoProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }));
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: "Here are some essential travel products you might need for your trip:",
      isBot: true,
      type: 'product',
      metadata: {
        products
      }
    }]);
  };

  const handleBookingQuery = () => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: "I found these travel packages that might interest you:",
      isBot: true,
      type: 'booking',
      metadata: {
        bookings: demoBookings
      }
    }]);
  };

  const handleBargainQuery = () => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: "I can offer you a special deal on this popular package:",
      isBot: true,
      type: 'bargain',
      metadata: {
        bargain: demoBargains[0]
      }
    }]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: `I've added the ${product.name} to your cart. Would you like to add anything else or checkout now?`,
      isBot: true
    }]);
  };

  const bookPackage = (booking: Booking) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: `Great choice! I've reserved the ${booking.destination} package for ${booking.date}. Would you like to proceed to payment or have any questions about this package?`,
      isBot: true
    }]);
  };

  const acceptBargain = (bargain: Bargain) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: `Amazing! I've applied a ${bargain.discount}% discount to your ${bargain.item} package. Your final price is now $${bargain.discountedPrice} (down from $${bargain.originalPrice}). Would you like to book this package now?`,
      isBot: true
    }]);
  };

  return (
    <div className="flex flex-col h-[500px] rounded-lg border">
      <div className="flex items-center justify-between p-4 border-b bg-wanderlust-teal text-white rounded-t-lg">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2 bg-white">
            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="AI Assistant" />
          </Avatar>
          <div>
            <h3 className="font-semibold">Wanderlust AI Concierge</h3>
            <p className="text-xs opacity-90">Online | Ready to assist</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-wanderlust-teal/90">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isBot 
                    ? 'bg-muted text-foreground' 
                    : 'bg-wanderlust-teal text-white'
                }`}
              >
                {message.type === 'product' && message.metadata?.products && (
                  <div className="space-y-3 mb-2">
                    {message.metadata.products.map((product: Product) => (
                      <Card key={product.id} className="flex overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-16 w-16 object-cover"
                        />
                        <div className="p-2 flex-1">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-wanderlust-teal font-semibold">${product.price}</p>
                        </div>
                        <div className="flex items-center p-2">
                          <Button 
                            size="sm" 
                            onClick={() => addToCart(product)}
                            className="bg-wanderlust-teal h-8"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                
                {message.type === 'booking' && message.metadata?.bookings && (
                  <div className="space-y-3 mb-2">
                    {message.metadata.bookings.map((booking: Booking) => (
                      <Card key={booking.id} className="p-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{booking.destination}</h4>
                          <Badge variant="teal">${booking.price}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {booking.date}
                        </p>
                        <div className="mt-2">
                          <Button 
                            size="sm" 
                            onClick={() => bookPackage(booking)}
                            className="bg-wanderlust-teal h-8 w-full"
                          >
                            Book Now
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                
                {message.type === 'bargain' && message.metadata?.bargain && (
                  <div className="mb-2">
                    <Card className="p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{message.metadata.bargain.item}</h4>
                        <Badge variant="destructive">
                          {message.metadata.bargain.discount}% OFF
                        </Badge>
                      </div>
                      <div className="mt-2 mb-3">
                        <p className="text-lg font-bold text-wanderlust-teal">
                          ${message.metadata.bargain.discountedPrice}
                          <span className="text-sm line-through text-muted-foreground ml-2">
                            ${message.metadata.bargain.originalPrice}
                          </span>
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => acceptBargain(message.metadata.bargain)}
                        className="bg-wanderlust-orange hover:bg-wanderlust-orange/90 w-full flex items-center gap-1"
                      >
                        <DollarSign className="h-4 w-4" />
                        Accept Deal
                      </Button>
                    </Card>
                  </div>
                )}
                
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted text-foreground">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about travel..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        <Button 
          onClick={handleSend} 
          size="icon" 
          disabled={isTyping}
          className="bg-wanderlust-teal hover:bg-wanderlust-teal/90"
        >
          {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </div>
      
      {cart.length > 0 && (
        <div className="p-2 bg-muted border-t text-sm flex justify-between items-center">
          <span>
            <ShoppingCart className="h-4 w-4 inline mr-1" />
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
          </span>
          <Button 
            variant="link" 
            className="text-wanderlust-teal p-0 h-auto"
            size="sm"
          >
            View Cart
          </Button>
        </div>
      )}
    </div>
  );
}
