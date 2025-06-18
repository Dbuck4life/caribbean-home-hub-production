'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, DollarSign, Home, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

interface Property {
  propertyType: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  lotSize: string;
  yearBuilt: string;
  listingPrice: string;
  description: string;
  features: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photos: File[];
}

export default function ListPropertyPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Property>({
    // Property Details
    propertyType: '',
    address: '',
    country: '',
    city: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    lotSize: '',
    yearBuilt: '',
    
    // Pricing
    listingPrice: '',
    
    // Property Features
    description: '',
    features: [],
    
    // Contact Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Photos
    photos: []
  });

  const countries: string[] = [
    'Guyana',
    'Trinidad & Tobago', 
    'Barbados',
    'Jamaica',
    'Suriname'
  ];

  const propertyTypes: string[] = [
    'Single Family Home',
    'Condominium',
    'Townhouse',
    'Villa',
    'Apartment',
    'Commercial Property',
    'Land/Lot',
    'Multi-Family',
    'Beach House'
  ];

  const features: string[] = [
    'Swimming Pool', 'Ocean View', 'Garden', 'Garage', 'Air Conditioning',
    'Security System', 'Balcony', 'Patio', 'Walk-in Closet', 'Hardwood Floors',
    'Updated Kitchen', 'Fireplace', 'Laundry Room', 'Storage Space', 'Gated Community'
  ];

  const handleInputChange = (field: keyof Property, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature: string): void => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const nextStep = (): void => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = (): void => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (): void => {
    // In a real app, this would submit to your backend
    console.log('Listing submitted:', formData);
    alert('Your property listing has been submitted! Our team will review it within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <h1 className="text-2xl font-bold text-blue-600">Caribbean Home Hub</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">List Your Caribbean Property</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Sell your property directly and save thousands in agent commissions. 
            Professional marketing and global exposure included.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              No Agent Fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Professional Photos
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Global Marketing
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Legal Support
            </div>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Property Details'}
                  {step === 2 && 'Pricing & Features'}
                  {step === 3 && 'Photos & Description'}
                  {step === 4 && 'Contact Information'}
                </span>
                {step < 4 && <div className="w-16 h-px bg-gray-200 ml-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            
            {/* Step 1: Property Details */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Home className="w-6 h-6 mr-3 text-blue-600" />
                  Property Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Property Type</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter full street address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="Postal/ZIP Code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms *
                    </label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num.toString()}>{num}+ Bedrooms</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms *
                    </label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      {[1,1.5,2,2.5,3,3.5,4,4.5,5].map(num => (
                        <option key={num} value={num.toString()}>{num} Bathrooms</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Square Footage
                    </label>
                    <input
                      type="number"
                      value={formData.squareFootage}
                      onChange={(e) => handleInputChange('squareFootage', e.target.value)}
                      placeholder="e.g., 2500"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                      placeholder="e.g., 2010"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Pricing & Features */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                  Pricing & Features
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Listing Price (USD) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.listingPrice}
                        onChange={(e) => handleInputChange('listingPrice', e.target.value)}
                        placeholder="450000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Research comparable properties in your area for competitive pricing
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Property Features (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {features.map(feature => (
                        <label key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.features.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos & Description */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Upload className="w-6 h-6 mr-3 text-blue-600" />
                  Photos & Description
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Photos
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">Upload Property Photos</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Drag and drop your photos here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          console.log('Files selected:', files);
                          alert(`${files.length} photos selected successfully!`);
                        }}
                        style={{ display: 'none' }}
                        id="photo-upload"
                      />
                      <label 
                        htmlFor="photo-upload"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                      >
                        Choose Files
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended: 10-20 high-quality photos. First photo will be the main listing image.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={8}
                      placeholder="Describe your property's best features, location highlights, recent upgrades, and what makes it special. Mention nearby amenities, schools, beaches, or attractions..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      A detailed description helps buyers understand your property's unique value
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-blue-600" />
                  Contact Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Smith"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What Happens Next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Our team reviews your listing within 24 hours</li>
                    <li>• We'll contact you to verify details and discuss marketing strategy</li>
                    <li>• Professional photos can be arranged if needed</li>
                    <li>• Your property goes live on our platform and partner networks</li>
                    <li>• You'll receive qualified buyer inquiries directly</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit Listing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
              <div className="text-gray-600">Commission Fees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24hr</div>
              <div className="text-gray-600">Review Process</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">5</div>
              <div className="text-gray-600">Caribbean Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Global</div>
              <div className="text-gray-600">Marketing Reach</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}