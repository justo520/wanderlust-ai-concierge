
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DestinationCard from './DestinationCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    title: 'Bali Beach Retreat',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop',
    price: 1299,
    rating: 4.8,
    duration: '7 days',
    discount: 15
  },
  {
    id: 2,
    title: 'Santorini Getaway',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2940&auto=format&fit=crop',
    price: 1599,
    rating: 4.9,
    duration: '5 days'
  },
  {
    id: 3,
    title: 'Tokyo Adventure',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2936&auto=format&fit=crop',
    price: 1899,
    rating: 4.7,
    duration: '10 days',
    discount: 10
  },
  {
    id: 4,
    title: 'Swiss Alps Expedition',
    location: 'Interlaken, Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2940&auto=format&fit=crop',
    price: 2199,
    rating: 4.9,
    duration: '8 days'
  },
  {
    id: 5,
    title: 'Maldives Paradise',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2940&auto=format&fit=crop',
    price: 2499,
    rating: 5.0,
    duration: '6 days',
    discount: 8
  },
  {
    id: 6,
    title: 'Safari Experience',
    location: 'Serengeti, Tanzania',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2908&auto=format&fit=crop',
    price: 2899,
    rating: 4.8,
    duration: '9 days'
  }
];

export default function FeaturedDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, destinations.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-wanderlust-blue">Featured Destinations</h2>
            <p className="text-muted-foreground mt-2">Explore our handpicked destinations</p>
          </div>
          <div className="flex space-x-2">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(currentIndex, currentIndex + itemsPerPage).map((destination) => (
            <DestinationCard 
              key={destination.id}
              image={destination.image}
              title={destination.title}
              location={destination.location}
              price={destination.price}
              rating={destination.rating}
              duration={destination.duration}
              discount={destination.discount}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            className="bg-wanderlust-teal hover:bg-wanderlust-teal/90"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
