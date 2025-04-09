
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import ChatbotButton from '../components/ChatbotButton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Sample car data
const carOptions = [
  {
    id: "car1",
    name: "Economy",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&auto=format&fit=crop&q=60",
    price: 35,
    seats: 4,
    transmission: "Automatic",
    luggage: 1
  },
  {
    id: "car2",
    name: "Compact SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60",
    price: 55,
    seats: 5,
    transmission: "Automatic",
    luggage: 2
  },
  {
    id: "car3",
    name: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&auto=format&fit=crop&q=60",
    price: 85,
    seats: 5,
    transmission: "Automatic",
    luggage: 3
  },
  {
    id: "car4",
    name: "Convertible",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=500&auto=format&fit=crop&q=60",
    price: 95,
    seats: 2,
    transmission: "Automatic",
    luggage: 1
  }
];

const CarHire = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [filteredCars, setFilteredCars] = useState(carOptions);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter based on availability
    // For now, we'll just show all cars
    setFilteredCars(carOptions);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={0} />
      <main className="flex-1">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-wanderlust-blue to-wanderlust-teal text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Ride</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore your destination with freedom. Choose from our wide range of vehicles.
            </p>
          </div>
        </div>

        {/* Search form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 -mt-16 relative z-10">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup-location">Pickup Location</Label>
                <Input 
                  id="pickup-location" 
                  placeholder="City, Airport, etc." 
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff-location">Dropoff Location</Label>
                <Input 
                  id="dropoff-location" 
                  placeholder="Same as pickup" 
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickup-date">Pickup Date</Label>
                <div className="relative">
                  <Input 
                    id="pickup-date" 
                    type="date" 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff-date">Dropoff Date</Label>
                <div className="relative">
                  <Input 
                    id="dropoff-date" 
                    type="date" 
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full bg-wanderlust-teal h-10">
                  Search Cars
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Car listings */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-wanderlust-blue mb-6">Available Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-wanderlust-blue">{car.name}</h3>
                    <Badge variant="teal">${car.price}/day</Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2 mb-4 flex-1">
                    <p>Seats: {car.seats} | Transmission: {car.transmission}</p>
                    <p>Luggage: {car.luggage} {car.luggage === 1 ? 'bag' : 'bags'}</p>
                  </div>
                  <Button className="w-full bg-wanderlust-teal mt-auto">
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-wanderlust-blue mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our AI assistant can help you find the perfect car for your trip based on your needs.
              Just click the chat button and ask about car rentals!
            </p>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-wanderlust-blue mb-12">
              Why Rent With Wanderlust
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Flexible Pickup & Return" 
                description="Multiple locations available with 24/7 service at major destinations."
                icon="🔄"
              />
              <FeatureCard 
                title="No Hidden Fees" 
                description="Transparent pricing with all taxes and insurance included."
                icon="💰"
              />
              <FeatureCard 
                title="AI-Powered Recommendations" 
                description="Get personalized car suggestions based on your trip details and preferences."
                icon="🤖"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-wanderlust-blue mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default CarHire;
