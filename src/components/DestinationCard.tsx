
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, Calendar } from 'lucide-react';

interface DestinationCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  duration: string;
  discount?: number;
}

export default function DestinationCard({
  image,
  title,
  location,
  price,
  rating,
  duration,
  discount
}: DestinationCardProps) {
  const discountedPrice = discount ? price - (price * discount / 100) : price;
  
  return (
    <Card className="overflow-hidden destination-card border-none shadow-md">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {discount && (
          <Badge 
            variant="destructive" 
            className="absolute top-3 right-3"
          >
            {discount}% OFF
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-wanderlust-yellow stroke-wanderlust-yellow mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center mt-2 text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">{duration}</span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            {discount ? (
              <div className="flex items-center">
                <span className="text-xl font-bold text-wanderlust-teal">
                  ${discountedPrice.toFixed(0)}
                </span>
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${price}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-wanderlust-teal">
                ${price}
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-1">/ person</span>
          </div>
          
          <a 
            href="#" 
            className="text-sm font-medium text-wanderlust-teal hover:text-wanderlust-blue hover:underline"
          >
            View Details
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
