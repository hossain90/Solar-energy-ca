import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Filter, ShoppingCart, Star } from 'lucide-react';
import SolarPanel from '../components/SolarPanel';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  featured: boolean;
  description: string;
  [key: string]: any;
}

const GOOGLE_SHEET_API = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // Replace with your deployed Apps Script URL

const Products: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GOOGLE_SHEET_API)
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(product => product.category === activeFilter);

  const renderProductImage = (product: Product) => {
    switch (product.image) {
      case 'panel':
        return <SolarPanel className="max-w-full" />;
      case 'inverter':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-20 h-40 bg-gray-300 rounded-lg shadow-md"></div>
          </div>
        );
      case 'battery':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-800"></div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading products...</div>;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 className="mb-6">Solar Products</h1>
          <div className="separator mx-auto" />
          <p className="text-xl max-w-2xl mx-auto">
            Browse our collection of high-quality solar panels, inverters, and batteries.
          </p>
        </div>
        
        {/* Mobile Filters */}
        <div className="md:hidden mb-8">
          <button 
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <div className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              <span>Filter Products</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {showFilters && (
            <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeFilter === 'all' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('all')}
                >
                  All Products
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeFilter === 'panels' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('panels')}
                >
                  Solar Panels
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeFilter === 'inverters' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('inverters')}
                >
                  Inverters
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeFilter === 'batteries' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('batteries')}
                >
                  Batteries
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Desktop Filters */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="flex space-x-2">
            <button 
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All Products
            </button>
            <button 
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeFilter === 'panels' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('panels')}
            >
              Solar Panels
            </button>
            <button 
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeFilter === 'inverters' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('inverters')}
            >
              Inverters
            </button>
            <button 
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeFilter === 'batteries' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('batteries')}
            >
              Batteries
            </button>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="flex flex-col border border-gray-200 overflow-hidden">
              <div className="h-56 bg-gray-50 flex items-center justify-center p-6">
                {renderProductImage(product)}
              </div>
              
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl">{product.name}</h3>
                  {product.featured && (
                    <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center mr-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${index < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{product.description}</p>
              </div>
              
              <div className="px-6 pb-6 border-t border-gray-100 pt-4 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-medium">${product.price?.toLocaleString?.() ?? product.price}</span>
                  <Link to={`/products/${product.id}`} className="text-sm hover:underline">
                    View details
                  </Link>
                </div>
                
                <button className="btn btn-primary w-full flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;