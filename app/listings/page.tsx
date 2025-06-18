'use client';

import React, { useState } from 'react';
import { Search, Filter, MapPin, Bed, Bath, Square, DollarSign, Star, Award, Globe, Shield, Plane, Home, Users } from 'lucide-react';

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    country: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    citizenshipEligible: false,
    priceRange: ''
  });

  // Expanded to include citizenship countries
  const countries = [
    // Original countries
    { code: 'GY', name: 'Guyana', currency: 'GYD', flag: '🇬🇾', citizenship: false },
    { code: 'TT', name: 'Trinidad & Tobago', currency: 'TTD', flag: '🇹🇹', citizenship: false },
    { code: 'JM', name: 'Jamaica', currency: 'JMD', flag: '🇯🇲', citizenship: false },
    { code: 'BB', name: 'Barbados', currency: 'BBD', flag: '🇧🇧', citizenship: false },
    { code: 'SR', name: 'Suriname', currency: 'SRD', flag: '🇸🇷', citizenship: false },
    
    // NEW: Citizenship by Investment countries
    { code: 'LC', name: 'St. Lucia', currency: 'XCD', flag: '🇱🇨', citizenship: true, minInvestment: 100000, program: 'Fastest approval (3-4 months)', benefits: ['Visa-free travel to 146+ countries', 'No residency requirement', 'Include family members'] },
    { code: 'DM', name: 'Dominica', currency: 'XCD', flag: '🇩🇲', citizenship: true, minInvestment: 100000, program: 'Most affordable program', benefits: ['Visa-free travel to 144+ countries', 'No physical residency', 'Generational citizenship'] },
    { code: 'AG', name: 'Antigua & Barbuda', currency: 'XCD', flag: '🇦🇬', citizenship: true, minInvestment: 130000, program: 'University of West Indies access', benefits: ['Visa-free travel to 151+ countries', 'Commonwealth citizenship', 'Business-friendly environment'] },
    { code: 'KN', name: 'St. Kitts & Nevis', currency: 'XCD', flag: '🇰🇳', citizenship: true, minInvestment: 150000, program: 'Original & most prestigious', benefits: ['Visa-free travel to 156+ countries', 'Oldest program (1984)', 'No tax on worldwide income'] },
    { code: 'GD', name: 'Grenada', currency: 'XCD', flag: '🇬🇩', citizenship: true, minInvestment: 150000, program: 'China visa-free + E-2 Treaty', benefits: ['Visa-free travel to China', 'US E-2 Treaty access', 'EU business opportunities'] }
  ];

  // Sample properties - regular properties first, then citizenship properties
  const sampleProperties = [
    // Regular properties first
    {
      id: 6,
      title: 'Family Home in Georgetown',
      location: 'Georgetown, Guyana',
      country: 'GY',
      price: 125000,
      currency: 'USD',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      type: 'Single Family Home',
      featured: true,
      citizenshipEligible: false,
      images: ['/api/placeholder/400/300'],
      description: 'Beautiful family home in prime Georgetown location. Perfect for growing families.',
      agent: 'Local Agent Network',
      benefits: ['Family Friendly', 'Established Neighborhood', 'Good Schools']
    },
    {
      id: 7,
      title: 'Waterfront Condo in Port of Spain',
      location: 'Port of Spain, Trinidad & Tobago',
      country: 'TT',
      price: 185000,
      currency: 'USD',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      type: 'Condo',
      featured: true,
      citizenshipEligible: false,
      images: ['/api/placeholder/400/300'],
      description: 'Modern waterfront condominium with stunning views of the Gulf of Paria.',
      agent: 'Caribbean Elite Realty',
      benefits: ['Waterfront Views', 'Modern Amenities', 'Security']
    },
    {
      id: 8,
      title: 'Beach House in Negril',
      location: 'Negril, Jamaica',
      country: 'JM',
      price: 220000,
      currency: 'USD',
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2000,
      type: 'Villa',
      featured: false,
      citizenshipEligible: false,
      images: ['/api/placeholder/400/300'],
      description: 'Charming beach house steps from Seven Mile Beach. Perfect vacation rental.',
      agent: 'Island Properties JM',
      benefits: ['Beach Access', 'Rental Income', 'Prime Location']
    },
    // Citizenship properties
    {
      id: 1,
      title: 'Luxury Beachfront Villa - Investment Opportunity',
      location: 'Castries, St. Lucia',
      country: 'LC',
      price: 250000,
      currency: 'USD',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      type: 'Villa',
      featured: true,
      citizenshipEligible: true,
      images: ['/api/placeholder/400/300'],
      description: 'Stunning beachfront villa with potential investment program benefits. Beautiful location with rental income potential.',
      agent: 'Marcus Thompson - Elite Agent',
      benefits: ['Investment Eligible', 'Beachfront Location', 'Rental Income']
    },
    {
      id: 2,
      title: 'Mountain Resort Development',
      location: 'Roseau, Dominica',
      country: 'DM',
      price: 175000,
      currency: 'USD',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2400,
      type: 'Investment Property',
      featured: true,
      citizenshipEligible: true,
      images: ['/api/placeholder/400/300'],
      description: 'Eco-resort development opportunity with potential program benefits. Nature island location.',
      agent: 'Priya Sharma - Elite Agent',
      benefits: ['Development Opportunity', 'Eco-Tourism', 'Nature Location']
    },
    {
      id: 3,
      title: 'Heritage Plantation Estate',
      location: 'St. Johns, Antigua & Barbuda',
      country: 'AG',
      price: 320000,
      currency: 'USD',
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      type: 'Estate',
      featured: true,
      citizenshipEligible: true,
      images: ['/api/placeholder/400/300'],
      description: 'Historic plantation estate with investment potential. Commonwealth location with university access.',
      agent: 'David Chen - Elite Agent',
      benefits: ['Historic Property', 'Large Estate', 'Investment Potential']
    }
  ];

  const citizenshipCountries = countries.filter(c => c.citizenship);
  const regularCountries = countries.filter(c => !c.citizenship);

  const filteredProperties = sampleProperties.filter(property => {
    if (filters.country && property.country !== filters.country) return false;
    if (filters.propertyType && property.type !== filters.propertyType) return false;
    if (filters.citizenshipEligible && !property.citizenshipEligible) return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) return false;
    return true;
  });

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getCountryInfo = (countryCode: string) => {
    return countries.find(c => c.code === countryCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Real Estate Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Caribbean Property Listings
          </h1>
          <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover premium real estate opportunities across the Caribbean region. 
            From family homes and vacation properties to investment opportunities.
          </p>
          
          {/* Subtle Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">10 Countries</h3>
              <p className="text-sm opacity-90">Complete coverage</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">All Property Types</h3>
              <p className="text-sm opacity-90">Homes to commercial</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">Verified Agents</h3>
              <p className="text-sm opacity-90">Professional network</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">Investment Options</h3>
              <p className="text-sm opacity-90">Some qualify for programs</p>
            </div>
          </div>
          
          {/* Subtle Mention */}
          <div className="mt-8">
            <p className="text-sm opacity-75 max-w-2xl mx-auto">
              Professional real estate platform serving the Caribbean region. 
              Selected properties may qualify for various investment and residency programs.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white shadow-lg p-6 mx-4 -mt-8 rounded-xl relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select
              value={filters.country}
              onChange={(e) => setFilters({...filters, country: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Countries</option>
              <optgroup label="Traditional Markets">
                {regularCountries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Investment Markets">
                {citizenshipCountries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Single Family Home">Single Family Home</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condominium</option>
              <option value="Estate">Estate</option>
              <option value="Investment Property">Investment Property</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => {
                const range = e.target.value;
                if (range === '100k-250k') {
                  setFilters({...filters, minPrice: '100000', maxPrice: '250000', priceRange: range});
                } else if (range === '250k-500k') {
                  setFilters({...filters, minPrice: '250000', maxPrice: '500000', priceRange: range});
                } else if (range === '500k+') {
                  setFilters({...filters, minPrice: '500000', maxPrice: '', priceRange: range});
                } else {
                  setFilters({...filters, minPrice: '', maxPrice: '', priceRange: ''});
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Prices</option>
              <option value="100k-250k">$100K - $250K</option>
              <option value="250k-500k">$250K - $500K</option>
              <option value="500k+">$500K+</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                checked={filters.citizenshipEligible}
                onChange={(e) => setFilters({...filters, citizenshipEligible: e.target.checked})}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Award className="h-4 w-4 mr-1" />
                Investment Eligible
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProperties.length} Properties Found
            {filters.citizenshipEligible && (
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Investment Eligible
              </span>
            )}
          </h2>
          <div className="text-gray-600">
            Premium Caribbean real estate opportunities
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => {
            const countryInfo = getCountryInfo(property.country);
            return (
              <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Property Image */}
                <div className="relative">
                  <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
                  {property.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  {property.citizenshipEligible && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      Investment
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {countryInfo?.flag} {countryInfo?.name}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(property.price, property.currency)}
                    </div>
                    {property.citizenshipEligible && countryInfo?.minInvestment && (
                      <div className="text-sm text-blue-600 font-medium">
                        Min: {formatCurrency(countryInfo.minInvestment || 0)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms} bed
                    </span>
                    <span className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms} bath
                    </span>
                    <span className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.sqft?.toLocaleString()} sqft
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm">
                    {property.description}
                  </p>

                  {/* Benefits */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {property.benefits.map((benefit, index) => (
                        <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                          benefit.includes('Investment') || benefit.includes('Citizenship') ? 'bg-blue-100 text-blue-800' :
                          benefit.includes('Rental') || benefit.includes('Income') ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Investment Program Info */}
                  {property.citizenshipEligible && countryInfo?.citizenship && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="text-sm font-semibold text-blue-900 mb-1">
                        Investment Program Eligible
                      </div>
                      <div className="text-xs text-blue-700">
                        • May qualify for {countryInfo.name} investment programs
                      </div>
                    </div>
                  )}

                  {/* Agent & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {property.agent}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Information Section */}
      <div className="bg-white py-16 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Investment Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Some Caribbean nations offer investment programs through real estate. 
              Our platform includes properties that may qualify for various programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citizenshipCountries.slice(0, 3).map(country => (
              <div key={country.code} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{country.flag}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{country.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{country.program}</p>
                <div className="text-lg font-bold text-blue-600">
                  From {formatCurrency(country.minInvestment || 0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Investment threshold</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 mb-4">
              * Investment program eligibility varies. Properties shown may qualify under specific categories. 
              Consult with qualified professionals for detailed requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}