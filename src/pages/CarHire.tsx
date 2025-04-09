
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Car, Calendar, MapPin, Users, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AIChat from '@/components/AIChat';

// Mock car rental data
const carRentals = [
  {
    id: 1,
    name: 'Economy Car',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop&q=80',
    price: 35,
    seats: 4,
    transmission: 'Automatic',
    location: 'Bangkok Airport',
    available: 'June 10-17, 2025'
  },
  {
    id: 2,
    name: 'Compact SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop&q=80',
    price: 55,
    seats: 5,
    transmission: 'Automatic',
    location: 'Phuket International Airport',
    available: 'July 15-25, 2025'
  },
  {
    id: 3,
    name: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=80',
    price: 85,
    seats: 5,
    transmission: 'Automatic',
    location: 'Chiang Mai Airport',
    available: 'August 5-15, 2025'
  },
  {
    id: 4,
    name: 'Convertible',
    image: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=400&auto=format&fit=crop&q=80',
    price: 95,
    seats: 2,
    transmission: 'Automatic',
    location: 'Krabi Airport',
    available: 'September 1-10, 2025'
  }
];

export default function CarHire() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openBookingChat = () => {
    setIsChatOpen(true);
  };

  return (
    <Layout>
      <div className="relative py-12 md:py-20 bg-gradient-to-r from-wanderlust-blue/10 to-wanderlust-teal/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-wanderlust-blue mb-4">Car Hire Made Easy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Find the perfect vehicle for your journey at the best price with our AI assistant.
            </p>
            <Button 
              onClick={openBookingChat}
              size="lg" 
              className="bg-wanderlust-teal hover:bg-wanderlust-teal/90"
            >
              <Car className="mr-2 h-5 w-5" />
              Book a Car with AI Assistant
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {carRentals.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl">{car.name}</h3>
                    <Badge variant="teal" className="text-sm">
                      ${car.price}/day
                    </Badge>
                  </div>
                  
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{car.seats} seats</span>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-2" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{car.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{car.available}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={openBookingChat}
                    className="w-full mt-4 bg-wanderlust-teal hover:bg-wanderlust-teal/90"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-wanderlust-blue mb-3">Why Book With Wanderlust?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-wanderlust-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-wanderlust-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">Our AI assistant finds the best deals and can even negotiate for further discounts.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-wanderlust-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-6 w-6 text-wanderlust-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                <p className="text-gray-600">Choose from economy cars to luxury vehicles at locations worldwide.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-wanderlust-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-wanderlust-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Booking</h3>
                <p className="text-gray-600">Free cancellation up to 48 hours before pickup for most bookings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-1">
              <AIChat 
                onClose={() => setIsChatOpen(false)} 
                initialPrompt="I'd like to book a car rental" 
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
