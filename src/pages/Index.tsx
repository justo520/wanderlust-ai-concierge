
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import ChatbotButton from '../components/ChatbotButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={0} />
      <main className="flex-1">
        <Hero />
        <FeaturedDestinations />
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wanderlust-blue">
              AI-Powered Travel Assistance
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Experience the future of travel planning with our intelligent virtual concierge
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Smart Recommendations" 
              description="Our AI analyzes your preferences to suggest destinations and activities tailored just for you."
              icon="🌍"
            />
            <FeatureCard 
              title="Bookings & Reservations" 
              description="Let our AI assistant handle your bookings, from flights and hotels to restaurant reservations."
              icon="🗓️"
            />
            <FeatureCard 
              title="Price Negotiations" 
              description="Our AI can bargain for better deals, helping you save money while enjoying premium experiences."
              icon="💰"
            />
          </div>
        </div>
        <Testimonials />
        <Newsletter />
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

export default Index;
