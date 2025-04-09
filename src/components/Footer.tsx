
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-wanderlust-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Wanderlust AI</h3>
            <p className="text-gray-300 mb-4">
              Discover the world with personalized travel experiences and AI-powered assistance.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<FacebookIcon size={20} />} />
              <SocialIcon icon={<TwitterIcon size={20} />} />
              <SocialIcon icon={<InstagramIcon size={20} />} />
              <SocialIcon icon={<YoutubeIcon size={20} />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/destinations" label="Destinations" />
              <FooterLink href="/packages" label="Travel Packages" />
              <FooterLink href="/shop" label="Shop" />
              <FooterLink href="/about" label="About Us" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <FooterLink href="/faq" label="FAQ" />
              <FooterLink href="/contact" label="Contact Us" />
              <FooterLink href="/terms" label="Terms & Conditions" />
              <FooterLink href="/privacy" label="Privacy Policy" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPinIcon size={20} className="mr-2 text-wanderlust-sand flex-shrink-0" />
                <p className="text-gray-300">123 Wanderlust Street, Travel City, TC 12345</p>
              </div>
              <div className="flex items-center">
                <PhoneIcon size={20} className="mr-2 text-wanderlust-sand flex-shrink-0" />
                <p className="text-gray-300">+1 (234) 567-8900</p>
              </div>
              <div className="flex items-center">
                <MailIcon size={20} className="mr-2 text-wanderlust-sand flex-shrink-0" />
                <p className="text-gray-300">info@wanderlust-ai.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">© 2025 Wanderlust AI. All rights reserved.</p>
          <p className="text-gray-300 mt-4 md:mt-0">
            Designed with <span className="text-wanderlust-orange">♥</span> for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a 
    href="#" 
    className="h-8 w-8 rounded-full bg-wanderlust-blue border border-gray-600 flex items-center justify-center hover:bg-wanderlust-teal transition duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link to={href} className="text-gray-300 hover:text-wanderlust-sand transition duration-200">
      {label}
    </Link>
  </li>
);
