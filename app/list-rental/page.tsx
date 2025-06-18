'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  // Property Details
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  furnished: boolean;
  
  // Location
  country: string;
  state: string;
  city: string;
  address: string;
  
  // Rental Details
  monthlyRent: number;
  securityDeposit: number;
  availableDate: string;
  leaseTerm: string;
  utilitiesIncluded: string[];
  
  // Property Features
  amenities: string[];
  petPolicy: string;
  smokingAllowed: boolean;
  
  // Media
  images: string[];
  virtualTourUrl: string;
  
  // Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Description
  title: string;
  description: string;
}

const CARIBBEAN_COUNTRIES = [
  'Antigua and Barbuda',
  'Bahamas',
  'Barbados',
  'Belize',
  'Dominica',
  'Dominican Republic',
  'Grenada',
  'Guyana',
  'Haiti',
  'Jamaica',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Suriname',
  'Trinidad and Tobago'
];

const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Villa',
  'Townhouse',
  'Condo',
  'Studio',
  'Room'
];

const AMENITIES = [
  'Swimming Pool',
  'Gym/Fitness Center',
  'Parking',
  'Air Conditioning',
  'Laundry',
  'Balcony/Terrace',
  'Garden',
  'Security',
  'Internet/WiFi',
  'Cable TV'
];

const UTILITIES = [
  'Electricity',
  'Water',
  'Gas',
  'Internet',
  'Cable TV',
  'Garbage Collection'
];

export default function ListRentalPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    propertyType: '',
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 0,
    furnished: false,
    country: '',
    state: '',
    city: '',
    address: '',
    monthlyRent: 0,
    securityDeposit: 0,
    availableDate: '',
    leaseTerm: '',
    utilitiesIncluded: [],
    amenities: [],
    petPolicy: 'No Pets',
    smokingAllowed: false,
    images: [],
    virtualTourUrl: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    title: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rental-listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          listingType: 'RENTAL',
          businessType: 'LANDLORD',
          fee: 49.00,
          status: 'PENDING_PAYMENT'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit listing');
      }

      const result = await response.json();
      
      // Redirect to payment page
      router.push(`/payment?listingId=${result.id}&amount=49`);
      
    } catch (error) {
      console.error('Error submitting listing:', error);
      alert('Failed to submit listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Property Details</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Property Type *</label>
              <select
                value={formData.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select property type</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms *</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bathrooms *</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', parseFloat(e.target.value))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Square Footage</label>
              <input
                type="number"
                min="0"
                value={formData.squareFootage}
                onChange={(e) => handleInputChange('squareFootage', parseInt(e.target.value))}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter square footage"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="furnished"
                checked={formData.furnished}
                onChange={(e) => handleInputChange('furnished', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="furnished" className="text-sm font-medium">Furnished</label>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Location</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Country *</label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select country</option>
                {CARIBBEAN_COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">State/Province</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter state or province"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter city"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
                placeholder="Enter complete address"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Rental Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Monthly Rent ($) *</label>
                <input
                  type="number"
                  min="0"
                  value={formData.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', parseFloat(e.target.value))}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter monthly rent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Security Deposit ($)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', parseFloat(e.target.value))}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter security deposit"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Available Date *</label>
              <input
                type="date"
                value={formData.availableDate}
                onChange={(e) => handleInputChange('availableDate', e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lease Term *</label>
              <select
                value={formData.leaseTerm}
                onChange={(e) => handleInputChange('leaseTerm', e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select lease term</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Utilities Included</label>
              <div className="grid grid-cols-2 gap-2">
                {UTILITIES.map(utility => (
                  <label key={utility} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.utilitiesIncluded.includes(utility)}
                      onChange={(e) => handleArrayChange('utilitiesIncluded', utility, e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{utility}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Property Features</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                {AMENITIES.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => handleArrayChange('amenities', amenity, e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pet Policy</label>
              <select
                value={formData.petPolicy}
                onChange={(e) => handleInputChange('petPolicy', e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="No Pets">No Pets</option>
                <option value="Cats Only">Cats Only</option>
                <option value="Dogs Only">Dogs Only</option>
                <option value="Cats and Dogs">Cats and Dogs</option>
                <option value="All Pets Welcome">All Pets Welcome</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="smoking"
                checked={formData.smokingAllowed}
                onChange={(e) => handleInputChange('smokingAllowed', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="smoking" className="text-sm font-medium">Smoking Allowed</label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Virtual Tour URL</label>
              <input
                type="url"
                value={formData.virtualTourUrl}
                onChange={(e) => handleInputChange('virtualTourUrl', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="https://example.com/virtual-tour"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact & Description</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Contact Name *</label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Email *</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Phone *</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Listing Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter an attractive title for your listing"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={5}
                placeholder="Describe your property in detail..."
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">List Your Rental Property</h1>
        <p className="text-gray-600">Step {currentStep} of 5</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Previous
            </button>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 ml-auto"
            >
              {isSubmitting ? 'Processing...' : 'Submit Listing ($49)'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}