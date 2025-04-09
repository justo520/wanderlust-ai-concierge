
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Navbar({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-wanderlust-teal font-bold text-2xl">Wanderlust</span>
              <span className="text-wanderlust-blue ml-1 text-lg">AI</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <NavLink href="/" label="Home" />
              <NavLink href="/destinations" label="Destinations" />
              <NavLink href="/packages" label="Packages" />
              <NavLink href="/car-hire" label="Car Hire" />
              <NavLink href="/shop" label="Shop" />
              <NavLink href="/about" label="About" />
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button variant="ghost" size="icon" className="text-wanderlust-blue">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-wanderlust-blue relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-wanderlust-blue">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("sm:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          <MobileNavLink href="/" label="Home" />
          <MobileNavLink href="/destinations" label="Destinations" />
          <MobileNavLink href="/packages" label="Packages" />
          <MobileNavLink href="/car-hire" label="Car Hire" />
          <MobileNavLink href="/shop" label="Shop" />
          <MobileNavLink href="/about" label="About" />
        </div>
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center justify-around">
            <Button variant="ghost" size="sm" className="text-wanderlust-blue flex items-center">
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="text-wanderlust-blue flex items-center relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    to={href}
    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-wanderlust-blue hover:text-wanderlust-teal hover:border-wanderlust-teal transition duration-150 ease-in-out"
  >
    {label}
  </Link>
);

const MobileNavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    to={href}
    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-wanderlust-blue hover:text-wanderlust-teal hover:bg-muted hover:border-wanderlust-teal transition duration-150 ease-in-out"
  >
    {label}
  </Link>
);
