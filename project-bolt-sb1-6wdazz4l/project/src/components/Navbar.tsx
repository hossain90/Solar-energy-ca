import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Menu, X, LayoutDashboard, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container-narrow flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Sun className="w-8 h-8" />
          <span className="text-xl font-light">SOLAR</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm hover:opacity-70 transition-opacity">
            HOME
          </Link>
          <Link to="/calculator" className="text-sm hover:opacity-70 transition-opacity">
            CALCULATOR
          </Link>
          <Link to="/comparison" className="text-sm hover:opacity-70 transition-opacity">
            COMPARISON
          </Link>
          <Link to="/products" className="text-sm hover:opacity-70 transition-opacity">
            PRODUCTS
          </Link>
          <Link to="/pricing" className="text-sm hover:opacity-70 transition-opacity">
            PRICING
          </Link>
          
          {/* Resources Dropdown */}
          <div className="relative" ref={resourcesRef}>
            <button
              className="text-sm hover:opacity-70 transition-opacity flex items-center space-x-1"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              <span>RESOURCES</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isResourcesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 w-48">
                  <Link
                    to="/blog"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/guide-to-solar"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Guide to Solar
                  </Link>
                  <Link
                    to="/installation-tips"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Installation Tips
                  </Link>
                  <Link
                    to="/faq"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/about" className="text-sm hover:opacity-70 transition-opacity">
            ABOUT
          </Link>
          <Link to="/dashboard" className="text-sm hover:opacity-70 transition-opacity flex items-center space-x-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>DASHBOARD</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <nav className="container-narrow py-4 space-y-4">
            <Link
              to="/"
              className="block text-sm hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              to="/calculator"
              className="block text-sm hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CALCULATOR
            </Link>
            <Link
              to="/comparison"
              className="block text-sm hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              COMPARISON
            </Link>
            <Link
              to="/products"
              className="block text-sm hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              PRODUCTS
            </Link>
            <Link
              to="/pricing"
              className="block text-sm hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              PRICING
            </Link>

            {/* Mobile Resources Section */}
            <div className="py-2 px-4 bg-gray-50 rounded-lg space-y-2">
              <p className="text-sm font-medium text-gray-600">RESOURCES</p>
              <Link
                to="/blog"
                className="block text-sm pl-2 hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/guide-to-solar"
                className="block text-sm pl-2 hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Guide to Solar
              </Link>
              <Link
                to="/installation-tips"
                className="block text-sm pl-2 hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Installation Tips
              </Link>
              <Link
                to="/faq"
                className="block text-sm pl-2 hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>

            <Link
              to="/about"
              className="block text-sm hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              to="/dashboard"
              className="block text-sm hover:opacity-70 transition-opacity flex items-center space-x-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>DASHBOARD</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;