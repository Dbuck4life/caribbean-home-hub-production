'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Upload, DollarSign, MapPin, Home, User, CreditCard, Check, Star, Crown, Waves, Shield, Phone, AlertCircle, X } from 'lucide-react';

// Caribbean countries with currencies and exchange rates
const CARIBBEAN_COUNTRIES = [
  { value: 'barbados', label: 'Barbados', flag: '🇧🇧', currency: 'BBD', symbol: 'Bds$', exchangeRate: 2.0 },
  { value: 'jamaica', label: 'Jamaica', flag: '🇯🇲', currency: 'JMD', symbol: 'J$', exchangeRate: 155.0 },
  { value: 'trinidad_tobago', label: 'Trinidad & Tobago', flag: '🇹🇹', currency: 'TTD', symbol: 'TT$', exchangeRate: 6.8 },
  { value: 'bahamas', label: 'Bahamas', flag: '🇧🇸', currency: 'BSD', symbol: 'B$', exchangeRate: 1.0 },
  { value: 'cayman_islands', label: 'Cayman Islands', flag: '🇰🇾', currency: 'KYD', symbol: 'CI$', exchangeRate: 0.83 },
  { value: 'guyana', label: 'Guyana', flag: '🇬🇾', currency: 'GYD', symbol: 'G$', exchangeRate: 209.0 },
  { value: 'suriname', label: 'Suriname', flag: '🇸🇷', currency: 'SRD', symbol: 'Sr$', exchangeRate: 36.0 },
  { value: 'dominican_republic', label: 'Dominican Republic', flag: '🇩🇴', currency: 'DOP', symbol: 'RD$', exchangeRate: 58.0 }
];

export default function PropertyListingForm() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{
    id: number;
    file: File;
    url: string;
    name: string;
  }>>([]);

  // Use a simple object instead of complex interface
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    propertyType: '',
    featured: false,
    
    // Location
    country: '',
    island: '',
    parishRegion: '',
    address: '',
    
    // Property Details
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    parkingSpaces: '',
    lotSize: '',
    
    // Financial
    price: '',
    priceLocalCurrency: '',
    localCurrency: '',
    monthlyHoaFees: '',
    propertyTaxes: '',
    listingType: 'sale',
    
    // Proximity
    beachDistanceMeters: '',
    airportDistanceKm: '',
    
    // Caribbean Features
    hurricaneProtection: false,
    impactWindows: false,
    backupGenerator: false,
    waterSource: '',
    internetSpeedMbps: '',
    airConditioning: '',
    
    // Investment
    foreignOwnershipAllowed: true,
    residencyProgramEligible: false,
    rentalPermitted: false,
    expectedRentalYield: '',
    
    // Agent Details
    agentName: '',
    agentEmail: '',
    agentPhone: '',
    agentWhatsApp: '',
    brokerage: '',
    
    // Package Selection
    selectedPackage: '',
    
    // Additional Features
    amenities: [] as string[],
    virtualTourUrl: '',
    videoUrl: ''
  });

  const packages = [
    {
      id: 'basic',
      name: 'Basic Listing',
      price: 25,
      duration: '30 days',
      features: [
        'Property listing for 30 days',
        'Up to 10 photos',
        'Basic property description',
        'Contact form integration',
        'Mobile-optimized display',
        'Email lead notifications'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Exposure',
      price: 75,
      duration: '60 days',
      features: [
        'Property listing for 60 days',
        'Up to 25 photos + virtual tour',
        'AI-enhanced property description',
        'Featured listing placement',
        'WhatsApp integration',
        'Social media promotion',
        'Lead analytics dashboard',
        'Priority customer support'
      ],
      popular: true
    },
    {
      id: 'platinum',
      name: 'Platinum Marketing',
      price: 150,
      duration: '90 days',
      features: [
        'Property listing for 90 days',
        'Unlimited photos + video tour',
        'Professional copywriting',
        'Homepage featured placement',
        'Multi-platform marketing',
        'Dedicated account manager',
        'Advanced analytics & reporting',
        'International buyer network access',
        'Custom landing page'
      ],
      popular: false
    }
  ];

  const amenitiesList = [
    'Swimming Pool', 'Beach Access', 'Tennis Court', 'Gym/Fitness Center',
    'Spa/Wellness', 'Marina/Dock', 'Golf Course Access', 'Restaurant/Bar',
    'Concierge Service', 'Security 24/7', 'Maid Service', 'Landscaping',
    'Wine Cellar', 'Home Theater', 'Office/Study', 'Guest House',
    'Outdoor Kitchen', 'Fire Pit', 'Jacuzzi/Hot Tub', 'Rooftop Terrace'
  ];

  // Auto-calculate local currency when USD price changes
  useEffect(() => {
    if (formData.price && formData.country) {
      const country = CARIBBEAN_COUNTRIES.find(c => c.value === formData.country);
      if (country && country.exchangeRate !== 1.0) {
        const localPrice = Math.round(parseFloat(formData.price) * country.exchangeRate);
        setFormData(prev => ({
          ...prev,
          priceLocalCurrency: localPrice.toString(),
          localCurrency: country.currency
        }));
      }
    }
  }, [formData.price, formData.country]);

  // Auto-detect currency when country changes
  useEffect(() => {
    if (formData.country) {
      const country = CARIBBEAN_COUNTRIES.find(c => c.value === formData.country);
      if (country) {
        setFormData(prev => ({
          ...prev,
          localCurrency: country.currency
        }));
      }
    }
  }, [formData.country]);

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (stepNumber) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Property title is required';
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.country) newErrors.country = 'Country is required';
        break;
      case 2:
        if (!formData.bedrooms && formData.propertyType !== 'land') newErrors.bedrooms = 'Bedrooms required';
        if (!formData.bathrooms && formData.propertyType !== 'land') newErrors.bathrooms = 'Bathrooms required';
        if (!formData.squareFeet) newErrors.squareFeet = 'Square footage is required';
        break;
      case 3:
        if (!formData.price) newErrors.price = 'Price is required';
        if (parseFloat(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';
        break;
      case 4:
        if (!formData.agentName.trim()) newErrors.agentName = 'Agent name is required';
        if (!formData.agentEmail.trim()) newErrors.agentEmail = 'Agent email is required';
        if (!formData.agentPhone.trim()) newErrors.agentPhone = 'Agent phone is required';
        if (!formData.selectedPackage) newErrors.selectedPackage = 'Please select a package';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simple update function
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
setErrors(prev => {
  const newErrors = { ...prev };
  delete newErrors[field];
  return newErrors;
});
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId: number) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const FormSection = ({ title, icon: Icon, children, required = false }: {
    title: string;
    icon: any;
    children: React.ReactNode;
    required?: boolean;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {required && <span className="text-sm text-red-500">* Required fields</span>}
        </div>
      </div>
      {children}
    </div>
  );

  const InputField = ({ 
    label, 
    field, 
    type = "text", 
    required = false, 
    placeholder = "", 
    options = null,
    ...props 
  }: {
    label: string;
    field: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    options?: Array<{value: string; label: string}> | null;
    [key: string]: any;
  }) => {
    const fieldValue = (formData as any)[field];
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {options ? (
          <select
            value={fieldValue || ''}
            onChange={(e) => updateFormData(field, e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors[field] ? 'border-red-500' : 'border-gray-300'
            }`}
            {...props}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            value={fieldValue || ''}
            onChange={(e) => updateFormData(field, e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors[field] ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            {...props}
          />
        ) : (
          <input
            type={type}
            value={fieldValue || ''}
            onChange={(e) => updateFormData(field, e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors[field] ? 'border-red-500' : 'border-gray-300'
            }`}
            {...props}
          />
        )}
        {errors[field] && (
          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors[field]}
          </div>
        )}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <FormSection title="Basic Information" icon={Home} required>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Property Title"
            field="title"
            required
            placeholder="e.g., Luxury Beachfront Villa with Pool"
          />
          <InputField
            label="Property Type"
            field="propertyType"
            required
            options={[
              { value: 'villa', label: 'Villa' },
              { value: 'condo', label: 'Condominium' },
              { value: 'penthouse', label: 'Penthouse' },
              { value: 'townhouse', label: 'Townhouse' },
              { value: 'estate', label: 'Estate' },
              { value: 'land', label: 'Land/Lot' },
              { value: 'commercial', label: 'Commercial' }
            ]}
          />
        </div>
        
        <InputField
          label="Property Description"
          field="description"
          type="textarea"
          required
          placeholder="Describe your property's unique features, amenities, and what makes it special..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Listing Type"
            field="listingType"
            options={[
              { value: 'sale', label: 'For Sale' },
              { value: 'rent', label: 'For Rent' },
              { value: 'sale_rent', label: 'Sale or Rent' }
            ]}
          />
          <div className="flex items-center pt-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => updateFormData('featured', e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                Featured Property <Star className="w-4 h-4 text-yellow-500" />
              </span>
            </label>
          </div>
        </div>
      </FormSection>

      <FormSection title="Location Details" icon={MapPin} required>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Country/Territory"
            field="country"
            required
            options={CARIBBEAN_COUNTRIES.map(country => ({
              value: country.value,
              label: `${country.flag} ${country.label}`
            }))}
          />
          <InputField
            label="Island/Region"
            field="island"
            placeholder="e.g., New Providence, St. James"
          />
          <InputField
            label="Parish/District"
            field="parishRegion"
            placeholder="e.g., St. James, Christ Church"
          />
          <InputField
            label="Full Address"
            field="address"
            placeholder="Complete property address (optional for privacy)"
          />
        </div>
      </FormSection>

      <FormSection title="Property Photos" icon={Camera}>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900">Upload Property Photos</p>
              <p className="text-gray-500">Click to select multiple images</p>
            </label>
          </div>
          
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadedImages.map(image => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </FormSection>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <FormSection title="Property Details" icon={Home} required>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <InputField
            label="Bedrooms"
            field="bedrooms"
            type="number"
            min="0"
            required={formData.propertyType !== 'land'}
          />
          <InputField
            label="Bathrooms"
            field="bathrooms"
            type="number"
            step="0.5"
            min="0"
            required={formData.propertyType !== 'land'}
          />
          <InputField
            label="Square Feet"
            field="squareFeet"
            type="number"
            min="0"
            required
          />
          <InputField
            label="Year Built"
            field="yearBuilt"
            type="number"
            min="1900"
            max="2025"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Parking Spaces"
            field="parkingSpaces"
            type="number"
            min="0"
          />
          <InputField
            label="Lot Size (sq ft)"
            field="lotSize"
            type="number"
            min="0"
          />
        </div>
      </FormSection>

      <FormSection title="Proximity & Access" icon={Waves}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Beach Distance (meters)"
            field="beachDistanceMeters"
            type="number"
            min="0"
            placeholder="0 = Beachfront property"
          />
          <InputField
            label="Airport Distance (km)"
            field="airportDistanceKm"
            type="number"
            min="0"
          />
        </div>
      </FormSection>

      <FormSection title="Caribbean Features" icon={Shield}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 border-b pb-2">Hurricane Protection</h4>
            <div className="space-y-3">
              {[
                { field: 'hurricaneProtection', label: 'Hurricane Protection System' },
                { field: 'impactWindows', label: 'Impact Windows' },
                { field: 'backupGenerator', label: 'Backup Generator' }
              ].map(item => (
                <label key={item.field} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(formData as any)[item.field] || false}
                    onChange={(e) => updateFormData(item.field, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 border-b pb-2">Utilities & Connectivity</h4>
            <InputField
              label="Water Source"
              field="waterSource"
              options={[
                { value: 'mains', label: 'Mains Water' },
                { value: 'cistern', label: 'Cistern Only' },
                { value: 'mains_cistern', label: 'Mains + Cistern' },
                { value: 'well', label: 'Private Well' },
                { value: 'desalination', label: 'Desalination Plant' }
              ]}
            />
            <InputField
              label="Internet Speed (Mbps)"
              field="internetSpeedMbps"
              type="number"
              min="0"
            />
            <InputField
              label="Air Conditioning"
              field="airConditioning"
              options={[
                { value: 'central', label: 'Central AC' },
                { value: 'split_units', label: 'Split Units' },
                { value: 'window_units', label: 'Window Units' },
                { value: 'none', label: 'None' }
              ]}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Amenities" icon={Star}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amenitiesList.map(amenity => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('amenities', [...formData.amenities, amenity]);
                  } else {
                    updateFormData('amenities', formData.amenities.filter(a => a !== amenity));
                  }
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </FormSection>
    </div>
  );

  const renderStep3 = () => {
    const selectedCountry = CARIBBEAN_COUNTRIES.find(c => c.value === formData.country);
    
    return (
      <div className="space-y-6">
        <FormSection title="Pricing & Financial Details" icon={DollarSign} required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Price (USD)"
              field="price"
              type="number"
              required
              min="0"
              placeholder="e.g., 850000"
            />
            {selectedCountry && selectedCountry.currency !== 'USD' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ({selectedCountry.currency}) {selectedCountry.symbol}
                  <span className="text-xs text-gray-500 ml-2">Auto-calculated</span>
                </label>
                <input
                  type="number"
                  value={formData.priceLocalCurrency}
                  onChange={(e) => updateFormData('priceLocalCurrency', e.target.value)}
                  min="0"
                  placeholder={`Price in ${selectedCountry.currency}`}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Monthly HOA Fees (USD)"
              field="monthlyHoaFees"
              type="number"
              min="0"
              placeholder="Monthly association fees"
            />
            <InputField
              label="Annual Property Taxes (USD)"
              field="propertyTaxes"
              type="number"
              min="0"
              placeholder="Annual tax amount"
            />
          </div>
        </FormSection>

        <FormSection title="Investment Features" icon={Crown}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 border-b pb-2">Ownership & Legal</h4>
              <div className="space-y-3">
                {[
                  { field: 'foreignOwnershipAllowed', label: 'Foreign Ownership Allowed' },
                  { field: 'residencyProgramEligible', label: 'Residency Program Eligible' },
                  { field: 'rentalPermitted', label: 'Short-term Rental Permitted' }
                ].map(item => (
                  <label key={item.field} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formData as any)[item.field] || false}
                      onChange={(e) => updateFormData(item.field, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 border-b pb-2">Investment Potential</h4>
              <InputField
                label="Expected Rental Yield (%)"
                field="expectedRentalYield"
                type="number"
                step="0.1"
                min="0"
                max="20"
                placeholder="Annual rental yield percentage"
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Virtual Media" icon={Camera}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Virtual Tour URL"
              field="virtualTourUrl"
              placeholder="Link to 360° virtual tour"
            />
            <InputField
              label="Video Tour URL"
              field="videoUrl"
              placeholder="Link to property video"
            />
          </div>
        </FormSection>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <FormSection title="Agent Information" icon={User} required>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Agent/Owner Name"
            field="agentName"
            required
            placeholder="Your full name"
          />
          <InputField
            label="Brokerage/Company"
            field="brokerage"
            placeholder="Company name (optional)"
          />
          <InputField
            label="Email Address"
            field="agentEmail"
            type="email"
            required
            placeholder="your@email.com"
          />
          <InputField
            label="Phone Number"
            field="agentPhone"
            type="tel"
            required
            placeholder="+1 (246) 123-4567"
          />
          <InputField
            label="WhatsApp Number"
            field="agentWhatsApp"
            type="tel"
            placeholder="WhatsApp number (if different)"
          />
        </div>
      </FormSection>

      <FormSection title="Choose Your Marketing Package" icon={CreditCard} required>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all transform hover:scale-105 ${
                formData.selectedPackage === pkg.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => updateFormData('selectedPackage', pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-4 py-1 rounded-full font-bold shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-600 text-sm ml-1">/{pkg.duration}</span>
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {pkg.duration}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="text-center">
                <input
                  type="radio"
                  name="package"
                  value={pkg.id}
                  checked={formData.selectedPackage === pkg.id}
                  onChange={() => updateFormData('selectedPackage', pkg.id)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 mx-auto rounded-full border-2 ${
                  formData.selectedPackage === pkg.id
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                } flex items-center justify-center`}>
                  {formData.selectedPackage === pkg.id && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {errors.selectedPackage && (
          <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
            <AlertCircle className="w-4 h-4" />
            {errors.selectedPackage}
          </div>
        )}
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Your Investment is Protected</h4>
              <p className="text-blue-800 text-sm">
                All packages include lead verification, fraud protection, and 24/7 customer support. 
                We guarantee qualified leads or provide a full refund within 30 days.
              </p>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="Listing Preview" icon={Star}>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Property Summary</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Title:</span> {formData.title || 'Property Title'}</p>
                <p><span className="font-medium">Type:</span> {formData.propertyType || 'Property Type'}</p>
                <p><span className="font-medium">Location:</span> {formData.country ? CARIBBEAN_COUNTRIES.find(c => c.value === formData.country)?.label : 'Location'}</p>
                <p><span className="font-medium">Price:</span> ${formData.price ? parseInt(formData.price).toLocaleString() : '0'} USD</p>
                <p><span className="font-medium">Size:</span> {formData.bedrooms || '0'} bed, {formData.bathrooms || '0'} bath</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Agent:</span> {formData.agentName || 'Agent Name'}</p>
                <p><span className="font-medium">Email:</span> {formData.agentEmail || 'agent@email.com'}</p>
                <p><span className="font-medium">Phone:</span> {formData.agentPhone || 'Phone Number'}</p>
                <p><span className="font-medium">Package:</span> {packages.find(p => p.id === formData.selectedPackage)?.name || 'Select Package'}</p>
              </div>
            </div>
          </div>
        </div>
      </FormSection>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, String(value));
        }
      });
      
      // Add images
      uploadedImages.forEach((image, index) => {
        submitData.append(`image_${index}`, image.file);
      });
      
      // Submit to your API endpoint
      const response = await fetch('/api/properties', {
        method: 'POST',
        body: submitData,
      });
      
      if (response.ok) {
        setStep(5); // Success step
      } else {
        throw new Error('Submission failed');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success step
  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Listed Successfully!</h1>
            
            <p className="text-gray-600 mb-8">
              Your Caribbean property has been submitted and will be reviewed within 24 hours. 
              You'll receive a confirmation email with your listing details and payment instructions.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
              <div className="text-left space-y-2 text-blue-800">
                <p>✓ We'll review your listing for quality and accuracy</p>
                <p>✓ You'll receive payment instructions for your selected package</p>
                <p>✓ Your property goes live within 24 hours of payment</p>
                <p>✓ You'll get access to your analytics dashboard</p>
                <p>✓ Qualified leads will be sent directly to your email and WhatsApp</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                List Another Property
              </button>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  View My Listings
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">List Your Caribbean Property</h1>
            <p className="text-xl text-gray-600">Connect with qualified international buyers and investors</p>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> Verified Platform
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" /> Premium Marketing
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" /> 24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {[
              { num: 1, title: 'Basic Info' },
              { num: 2, title: 'Details' },
              { num: 3, title: 'Pricing' },
              { num: 4, title: 'Complete' }
            ].map(stepInfo => (
              <div key={stepInfo.num} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                    stepInfo.num <= step
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : stepInfo.num === step + 1
                      ? 'border-blue-300 text-blue-300'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {stepInfo.num < step ? <Check className="w-6 h-6" /> : stepInfo.num}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  stepInfo.num <= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepInfo.title}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                step === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              ← Previous
            </button>
            
            <div className="text-center">
              <span className="text-sm text-gray-500">Step {step} of 4</span>
            </div>
            
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Submit Property
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Verified</h3>
            <p className="text-gray-600 text-sm">All listings are verified and leads are qualified before contact</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Premium Exposure</h3>
            <p className="text-gray-600 text-sm">Featured placement and social media marketing included</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Dedicated account management and technical support</p>
          </div>
        </div>
      </div>
    </div>
  );
}