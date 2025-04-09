
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
        duration: 5000,
      });
      
      // Reset success state after a while
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section className="bg-wanderlust-teal py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Get Travel Inspiration</h2>
          <p className="text-white/90 mt-2 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive deals, travel tips, and AI-powered recommendations
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/90 border-0 focus-visible:ring-wanderlust-yellow"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting || isSubscribed}
              className="h-12 px-6 bg-wanderlust-yellow text-wanderlust-blue hover:bg-wanderlust-yellow/90"
            >
              {isSubmitting ? 'Subscribing...' : isSubscribed ? (
                <span className="flex items-center">
                  <Check className="mr-1 h-5 w-5" /> Subscribed
                </span>
              ) : 'Subscribe'}
            </Button>
          </form>
          <p className="text-white/80 text-xs mt-3 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
