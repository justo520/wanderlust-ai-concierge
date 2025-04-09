
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-muted">
        <div className="text-center p-8 max-w-2xl">
          <h1 className="text-9xl font-bold text-wanderlust-teal mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-wanderlust-blue mb-6">Oops! This destination doesn't exist</h2>
          <p className="text-xl text-muted-foreground mb-8">
            The page you're looking for seems to have wandered off the map. Let's get you back on track.
          </p>
          <Link to="/">
            <Button 
              size="lg" 
              className="bg-wanderlust-teal hover:bg-wanderlust-teal/90 px-8"
            >
              Return to Homepage
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
