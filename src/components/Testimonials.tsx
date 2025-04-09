
import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    location: 'New York, USA',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    testimonial: 'The AI assistant helped me plan the perfect Bali vacation. It recommended activities I would have never found on my own and even negotiated a discount for my hotel stay. Amazing service!'
  },
  {
    id: 2,
    name: 'David Chen',
    location: 'Toronto, Canada',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    testimonial: 'I was skeptical about using an AI travel assistant, but Wanderlust AI exceeded my expectations. It handled all my Tokyo bookings and even found me a great deal on flights. Highly recommend!'
  },
  {
    id: 3,
    name: 'Sophie Martin',
    location: 'Paris, France',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 4,
    testimonial: 'The chatbot was incredibly helpful in recommending travel essentials for my safari adventure. I loved how it curated products specifically for my trip needs!'
  },
  {
    id: 4,
    name: 'Carlos Vega',
    location: 'Madrid, Spain',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    testimonial: 'I saved over $300 on my Santorini package thanks to the AI\'s bargaining skills. It was like having a personal travel agent available 24/7. Will definitely use for all my future trips!'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wanderlust-blue">What Our Travelers Say</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover how Wanderlust AI has transformed travel experiences for adventurers around the world
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(currentIndex, currentIndex + itemsPerView).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className="border-wanderlust-teal text-wanderlust-teal hover:bg-wanderlust-teal/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext} 
              disabled={currentIndex === maxIndex}
              className="border-wanderlust-teal text-wanderlust-teal hover:bg-wanderlust-teal/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    location: string;
    image: string;
    rating: number;
    testimonial: string;
  };
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4 border-2 border-wanderlust-teal">
            <img src={testimonial.image} alt={testimonial.name} />
          </Avatar>
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${
                i < testimonial.rating 
                  ? 'fill-wanderlust-yellow stroke-wanderlust-yellow' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
        </div>
        
        <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
      </CardContent>
    </Card>
  );
}
