'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Rental Property Interface
interface RentalProperty {
  id: number;
  title: string;
  location: string;
  monthlyRent: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
}

function RentalPropertyCard({ property }: { property: RentalProperty }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={property.image} 
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          {property.furnished && <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Furnished</span>}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">${property.monthlyRent.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <Link href={`/rental/${property.id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RentalsPage() {
  const [rentalProperties, setRentalProperties] = useState<RentalProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample rental data
    const sampleRentals: RentalProperty[] = [
      {
        id: 1,
        title: "Modern Beachfront Apartment",
        location: "Georgetown, Guyana",
        monthlyRent: 1200,
        bedrooms: 2,
        bathrooms: 2,
        furnished: true,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop"
      },
      {
        id: 2,
        title: "Downtown Studio Loft",
        location: "Port of Spain, Trinidad",
        monthlyRent: 800,
        bedrooms: 1,
        bathrooms: 1,
        furnished: false,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop"
      },
      {
        id: 3,
        title: "Luxury Villa Rental",
        location: "Bridgetown, Barbados",
        monthlyRent: 2500,
        bedrooms: 4,
        bathrooms: 3,
        furnished: true,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop"
      }
    ];
    
    setTimeout(() => {
      setRentalProperties(sampleRentals);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600">Caribbean Home Hub</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600">← Back to Home</Link>
              <Link href="/list-rental" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                List Your Rental
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Caribbean Rental Properties</h1>
          <p className="text-xl">Find your perfect rental home across the Caribbean islands</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <select className="border rounded px-3 py-2">
              <option>All Countries</option>
              <option>Guyana</option>
              <option>Trinidad & Tobago</option>
              <option>Barbados</option>
              <option>Jamaica</option>
              <option>Suriname</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Any Bedrooms</option>
              <option>1 Bedroom</option>
              <option>2 Bedrooms</option>
              <option>3+ Bedrooms</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Any Price</option>
              <option>Under $1,000</option>
              <option>$1,000 - $2,000</option>
              <option>$2,000+</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Furnished or Unfurnished</option>
              <option>Furnished Only</option>
              <option>Unfurnished Only</option>
            </select>
          </div>
        </div>
      </section>

      {/* Rental Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Available Rentals</h2>
            <p className="text-gray-600">{rentalProperties.length} properties found</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading rental properties...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rentalProperties.map(property => (
                <RentalPropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Property to Rent?</h2>
          <p className="text-xl mb-8">List your rental property and start earning monthly income</p>
          <Link href="/list-rental">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors">
              💰 List Your Rental Property
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}