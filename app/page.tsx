'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Property Card Component
interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={property.image} 
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4">{property.location}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">${property.price.toLocaleString()}</span>
          <Link href={`/property/${property.id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample data - replace with actual API call
    const sampleProperties: Property[] = [
      {
        id: 1,
        title: "Luxury Beachfront Villa",
        location: "Georgetown, Guyana",
        price: 450000,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop"
      },
      {
        id: 2,
        title: "Modern Downtown Apartment",
        location: "Port of Spain, Trinidad",
        price: 280000,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop"
      },
      {
        id: 3,
        title: "Colonial Heritage Home",
        location: "Bridgetown, Barbados",
        price: 650000,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop"
      }
    ];
    
    setTimeout(() => {
      setFeaturedProperties(sampleProperties);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Enhanced Navigation */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <h1 className="text-2xl font-bold text-blue-600">Caribbean Home Hub</h1>
              </Link>
              <span className="text-sm text-gray-600 hidden md:block">
                Premium Caribbean Real Estate Platform
              </span>
            </div>
            
            {/* Enhanced Navigation Menu */}
<div className="flex items-center space-x-6"></div>
              {/* Properties Dropdown */}
<div className="relative group">
  <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center">
    Properties
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
    <Link href="/listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
      🏠 Buy Properties
    </Link>
    <Link href="/rentals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
      🏢 Rent Properties
    </Link>
    <Link href="/list-rental" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
      💰 List a Rental
    </Link>
  </div>
</div>
              
  {/* Agents Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center">
                  Agents
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/agents/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    🏆 Join Elite Network
                  </Link>
                  <Link href="/agents-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    📊 Agent Dashboard
                  </Link>
                </div>
              </div>

              {/* List Property Button (FSBO) */}
              <Link href="/list-property">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  List Your Property
                </button>
              </Link>

          



{/* Sign In Button */}
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </Link>

              {/* ADVERTISE Dropdown - Traffic Light Green with Bold White Text */}
              <div className="relative group">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-md flex items-center">
                  Advertise
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/agents-dashboard/advertise" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">
                    🏆 Real Estate Agents
                  </Link>
                  <Link href="/advertise/local-business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">
                    🏪 Local Businesses
                  </Link>
                  <Link href="/advertise/packages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">
                    📋 View All Packages
                  </Link>
                </div>
              </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with FSBO Call-to-Action */}
      <section className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Discover Your Dream Home in the Caribbean
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            The only professional platform connecting premium Caribbean real estate opportunities 
            across Guyana, Trinidad, Barbados, Jamaica, and Suriname with global investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Browse Properties
              </button>
            </Link>
            <Link href="/list-property">
              <button className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors shadow-lg">
                💰 Sell Without Agent Fees
              </button>
            </Link>
            <a 
              href="https://wa.me/5925551234?text=Hi! I'm interested in learning more about Caribbean Home Hub properties and investment opportunities."
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                WhatsApp Expert
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Revenue Opportunities Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Multiple Ways to Succeed</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Buy Properties</h3>
              <p className="text-gray-600 mb-4">
                Find your dream Caribbean home with AI-powered descriptions and local expertise.
              </p>
              <Link href="/listings">
                <button className="text-blue-600 font-semibold hover:text-blue-700">Browse Properties →</button>
              </Link>
            </div>
            
            <div className="p-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Sell Your Property</h3>
              <p className="text-gray-600 mb-4">
                List directly and save thousands in agent commissions. Professional marketing included.
              </p>
              <Link href="/list-property">
                <button className="text-green-600 font-semibold hover:text-green-700">List Property →</button>
              </Link>
            </div>
            
            <div className="p-6">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Join Elite Agents</h3>
              <p className="text-gray-600 mb-4">
                Access premium Caribbean leads and build your real estate business.
              </p>
              <Link href="/agents/register">
                <button className="text-yellow-600 font-semibold hover:text-yellow-700">Join Network →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-600">Caribbean Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Elite Agents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">$50M+</div>
              <div className="text-gray-600">Platform Valuation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">AI</div>
              <div className="text-gray-600">Property Descriptions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-selected premium properties from across the Caribbean, 
              perfect for investment or your dream home.
            </p>
          </div>
          
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/listings">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All Properties
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose Caribbean Home Hub?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            The first and only professional Caribbean-wide real estate platform, 
            built by entrepreneurs for serious investors.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Descriptions</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced artificial intelligence creates detailed, accurate property descriptions 
                to help you make informed investment decisions quickly.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏝️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Local Caribbean Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                Deep knowledge of all Caribbean markets with local connections, 
                legal expertise, and real-time insights across 5 countries.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Investor Network</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect Caribbean properties with international investors and 
                diaspora communities in the US, Canada, UK, and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Caribbean Countries Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Serving All Caribbean Markets</h2>
            <p className="text-xl max-w-3xl mx-auto">
              The only platform with comprehensive coverage across major Caribbean investment destinations
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-2xl mb-3">🇬🇾</div>
              <h3 className="font-bold text-lg">Guyana</h3>
              <p className="text-sm mt-2 opacity-90">Fastest growing economy</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-2xl mb-3">🇹🇹</div>
              <h3 className="font-bold text-lg">Trinidad & Tobago</h3>
              <p className="text-sm mt-2 opacity-90">Energy sector hub</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-2xl mb-3">🇧🇧</div>
              <h3 className="font-bold text-lg">Barbados</h3>
              <p className="text-sm mt-2 opacity-90">Tourism & business center</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-2xl mb-3">🇯🇲</div>
              <h3 className="font-bold text-lg">Jamaica</h3>
              <p className="text-sm mt-2 opacity-90">Cultural & economic powerhouse</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-2xl mb-3">🇸🇷</div>
              <h3 className="font-bold text-lg">Suriname</h3>
              <p className="text-sm mt-2 opacity-90">Emerging market opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Caribbean Investment Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who trust Caribbean Home Hub 
            for their Caribbean real estate needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
                Explore Properties
              </button>
            </Link>
            <Link href="/list-property">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors">
                List Your Property
              </button>
            </Link>
            <a 
              href="https://wa.me/5925551234?text=Hi! I'm ready to start investing in Caribbean real estate. Can you help me find the right properties?"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-800 transition-colors">
                Speak with Expert
              </button>
            </a>
          </div>
        </div>
      </section>

  {/* Enhanced Footer with Discreet Admin Access */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Caribbean Home Hub</h3>
              <p className="text-gray-400 mb-4">Premium Caribbean Real Estate Platform</p>
              <p className="text-sm text-gray-500">www.caribbeanhomehub.com</p>
            </div>
            
            {/* For Buyers */}
            <div>
              <h4 className="font-bold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/listings" className="text-gray-400 hover:text-white">Browse Properties</Link></li>
                <li><Link href="/listings?type=luxury" className="text-gray-400 hover:text-white">Luxury Homes</Link></li>
                <li><Link href="/listings?type=investment" className="text-gray-400 hover:text-white">Investment Properties</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white">Buyer Dashboard</Link></li>
              </ul>
            </div>
            
            {/* For Sellers & Agents */}
            <div>
              <h4 className="font-bold mb-4">For Sellers & Agents</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/list-property" className="text-gray-400 hover:text-white">List Your Property</Link></li>
                <li><Link href="/agents/register" className="text-gray-400 hover:text-white">Join Elite Agents</Link></li>
                <li><Link href="/agents/login" className="text-gray-400 hover:text-white">Agent Login</Link></li>
                <li><Link href="/agents/dashboard" className="text-gray-400 hover:text-white">Agent Dashboard</Link></li>
              </ul>
            </div>
            
            {/* Company & Contact */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li>
                  {/* DISCREET ADMIN ACCESS - Only visible to those who know */}
                  <Link href="/admin/login" className="text-gray-600 hover:text-gray-500 text-xs opacity-40 transition-opacity">
                    Staff Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 Caribbean Home Hub. Connecting Caribbean properties with global investors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}