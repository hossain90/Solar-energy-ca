import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Mail, Phone, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-narrow pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sun className="w-6 h-6" />
              <span className="text-xl font-light">SOLAR</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Embracing the power of the sun to create a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:opacity-70 transition-opacity">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">NAVIGATION</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/comparison" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Comparison
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">RESOURCES</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Guide to Solar
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Installation Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">CONTACT</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <a href="mailto:info@solarcompany.com" className="text-sm text-gray-600 hover:text-black transition-colors">
                  info@solarcompany.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <a href="tel:+12345678900" className="text-sm text-gray-600 hover:text-black transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} SOLAR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;