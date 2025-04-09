
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const heroBackgrounds = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop'
];

const destinations = [
  'Bali',
  'Santorini',
  'Tokyo',
  'Machu Picchu',
  'Maldives',
  'Paris'
];

export default function Hero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [currentDestIndex, setCurrentDestIndex] = useState(0);
  
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    
    const destInterval = setInterval(() => {
      setCurrentDestIndex((prev) => (prev + 1) % destinations.length);
    }, 3000);
    
    return () => {
      clearInterval(bgInterval);
      clearInterval(destInterval);
    };
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background images with zoom effect */}
      {heroBackgrounds.map((bg, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center transform scale-105"
          style={{
            backgroundImage: `url(${bg})`,
            opacity: index === currentBgIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
          Discover Amazing Places with AI-Powered Travel Assistance
        </h1>
        <div className="h-12 mb-6">
          <p className="text-xl md:text-2xl animate-fade-in">
            Planning your dream vacation to{' '}
            <span className="text-wanderlust-sand font-semibold">
              {destinations[currentDestIndex]}
            </span>{' '}
            has never been easier
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button 
            size="lg" 
            className="bg-wanderlust-teal hover:bg-wanderlust-teal/90 text-white"
          >
            Explore Destinations
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white/20"
          >
            Chat with AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
