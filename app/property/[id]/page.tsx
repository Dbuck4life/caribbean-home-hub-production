'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Property {
  id: number;
  title: string;
  location: string;
  country: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: number;
  yearBuilt: number;
  propertyType: string;
  images: string[];
  featured: boolean;
  description: string;
  features: string[];
  nearbyAmenities: string[];
  whatsappMessage: string;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample property data - replace with actual API call
    const sampleProperty: Property = {
      id: parseInt(params.id as string),
      title: "Luxury Beachfront Villa",
      location: "Georgetown",
      country: "Guyana",
      price: 450000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      lotSize: 12000,
      yearBuilt: 2020,
      propertyType: "Villa",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&h=600&fit=crop"
      ],
      featured: true,
      description: "This stunning beachfront villa represents the pinnacle of luxury living in Georgetown, Guyana. Located on a pristine stretch of coastline, this modern architectural masterpiece offers panoramic ocean views from every room. The property features an open-concept design with floor-to-ceiling windows, a gourmet kitchen with premium appliances, and a master suite with private ocean-view balcony. The outdoor space includes a infinity pool, private beach access, and covered entertainment areas perfect for tropical living. This is an exceptional opportunity for luxury living or high-end vacation rental investment in one of the Caribbean's most sought-after locations.",
      features: [
        "Private beach access",
        "Infinity swimming pool",
        "Ocean views from all rooms",
        "Gourmet kitchen with island",
        "Master suite with private balcony",
        "Central air conditioning",
        "Security system",
        "Covered parking for 2 cars",
        "Outdoor entertainment area",
        "Premium appliances included",
        "High-speed internet ready",
        "Backup generator"
      ],
      nearbyAmenities: [
        "Georgetown International Airport - 15 minutes",
        "Downtown Georgetown - 20 minutes",
        "Marriott Hotel - 10 minutes",
        "Shopping centers - 12 minutes",
        "International school - 8 minutes",
        "Medical facilities - 10 minutes",
        "Golf course - 25 minutes",
        "Restaurants and nightlife - 15 minutes"
      ],
      whatsappMessage: "Hi! I'm very interested in the Luxury Beachfront Villa in Georgetown, Guyana ($450,000). Can we schedule a private viewing and discuss financing options?",
      agent: {
        name: "Maria Santos",
        phone: "+592-555-1234",
        email: "maria@caribbeanhomehub.com"
      }
    };

    setTimeout(() => {
      setProperty(sampleProperty);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Property Not Found</h1>
          <Link href="/listings">
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Back to Listings
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/5925551234?text=${encodeURIComponent(property.whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Caribbean Home Hub
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/listings" className="text-gray-700 hover:text-blue-600">
                Properties
              </Link>
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/listings" className="text-blue-600 hover:text-blue-800">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">{property.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img 
                  src={property.images[selectedImage]} 
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
                    Featured Property
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`View ${index + 1}`}
                      className={`w-20 h-16 object-cover rounded cursor-pointer transition-all ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Property Description */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Description</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{property.description}</p>
              
              {/* AI Generated Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <span>🤖</span>
                <span>Enhanced with AI insights</span>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Features</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Amenities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Amenities</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {property.nearbyAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-blue-500">📍</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Property Info and Contact */}
          <div className="lg:col-span-1">
            {/* Property Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                  {property.country === 'Guyana' && 'GY'}
                  {property.country === 'Trinidad' && 'TT'}
                  {property.country === 'Barbados' && 'BB'}
                  {property.country === 'Jamaica' && 'JM'}
                  {property.country === 'Suriname' && 'SR'}
                </span>
                <span className="text-gray-600">{property.location}, {property.country}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
              
              <div className="text-3xl font-bold text-green-600 mb-6">
                ${property.price.toLocaleString()}
                <div className="text-sm text-gray-500 font-normal">
                  {property.country === 'Guyana' && `≈ GYD $${(property.price * 210).toLocaleString()}`}
                  {property.country === 'Trinidad' && `≈ TTD $${(property.price * 6.8).toLocaleString()}`}
                  {property.country === 'Barbados' && `≈ BBD $${(property.price * 2).toLocaleString()}`}
                  {property.country === 'Jamaica' && `≈ JMD $${(property.price * 155).toLocaleString()}`}
                  {property.country === 'Suriname' && `≈ SRD $${(property.price * 36).toLocaleString()}`}
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-gray-800">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-gray-800">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-gray-800">{property.sqft.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-gray-800">{property.yearBuilt}</div>
                  <div className="text-sm text-gray-600">Year Built</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  WhatsApp Agent
                </a>
                
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Schedule Viewing
                </button>
                
                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Save Property
                </button>
              </div>

              {/* Agent Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">Your Local Expert</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">MS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{property.agent.name}</div>
                    <div className="text-sm text-gray-600">Licensed Caribbean Agent</div>
                    <div className="text-sm text-blue-600">{property.agent.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Similar Properties</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Interested in similar properties in {property.country}?</p>
            <Link href={`/listings?country=${property.country}`}>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View More Properties in {property.country}
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}