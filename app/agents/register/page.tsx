'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Elite Pricing Tiers (Premium Quality Control)
const AGENT_TIERS = {
  starter: {
    name: "Starter Agent",
    badge: "🥉",
    price: 35,
    currency: "USD",
    requirements: [
      "Valid real estate license",
      "Basic identity verification",
      "Platform training completion"
    ],
    features: [
      "10 leads per month",
      "Basic property listings",
      "Email support",
      "Standard profile visibility"
    ],
    verification: "Basic",
    leadPriority: 3,
    countries: ["Guyana", "Trinidad", "Jamaica", "Barbados", "Suriname"]
  },
  certified: {
    name: "Certified Professional",
    badge: "🥈",
    price: 75,
    currency: "USD",
    requirements: [
      "2+ years proven experience",
      "Professional references (3)",
      "License + background verification",
      "Sales performance history"
    ],
    features: [
      "35 leads per month",
      "Featured property listings",
      "Priority customer support",
      "Enhanced profile with testimonials",
      "Mobile money payment options",
      "Performance analytics"
    ],
    verification: "Professional",
    leadPriority: 2,
    countries: "all"
  },
  elite: {
    name: "Verified Elite",
    badge: "🥇",
    price: 150,
    currency: "USD",
    requirements: [
      "5+ years elite experience",
      "$1M+ in closed transactions",
      "Client testimonials (10+)",
      "Professional certifications",
      "Background + financial verification"
    ],
    features: [
      "Unlimited premium leads",
      "First access to luxury listings",
      "Dedicated account manager", 
      "Custom marketing materials",
      "International client matching",
      "Revenue sharing opportunities",
      "White-label platform access"
    ],
    verification: "Elite",
    leadPriority: 1,
    countries: "global"
  }
};

// Payment Methods by Region
const PAYMENT_OPTIONS = {
  "Guyana": [
    { name: "GTT Mobile Money", fee: "2%", icon: "📱" },
    { name: "Republic Bank Transfer", fee: "1%", icon: "🏦" },
    { name: "Cash Collection", fee: "5%", icon: "💵" },
    { name: "International Wire", fee: "3%", icon: "🌍" }
  ],
  "Trinidad": [
    { name: "bmobile Money", fee: "2%", icon: "📱" },
    { name: "Digicel Mobile", fee: "2%", icon: "📱" },
    { name: "RBC Royal Bank", fee: "1%", icon: "🏦" },
    { name: "Cash Collection", fee: "5%", icon: "💵" }
  ],
  "Jamaica": [
    { name: "LYNK Mobile Money", fee: "2%", icon: "📱" },
    { name: "JN Money Transfer", fee: "2%", icon: "📱" },
    { name: "NCB Bank Transfer", fee: "1%", icon: "🏦" },
    { name: "Cash Collection", fee: "5%", icon: "💵" }
  ],
  "USA": [
    { name: "Credit Card", fee: "2.9%", icon: "💳" },
    { name: "ACH Bank Transfer", fee: "0.8%", icon: "🏦" },
    { name: "PayPal", fee: "3.5%", icon: "💰" }
  ],
  "Canada": [
    { name: "Credit Card", fee: "2.9%", icon: "💳" },
    { name: "Interac e-Transfer", fee: "1%", icon: "🏦" },
    { name: "PayPal", fee: "3.5%", icon: "💰" }
  ]
};

// Elite verification tracking
const trackEliteSignup = (tierType: string, agentData: any, verificationLevel: string) => {
  const monthlyValue = AGENT_TIERS[tierType as keyof typeof AGENT_TIERS].price;
  const annualValue = monthlyValue * 12;
  
  console.log(`🏆 ELITE AGENT SIGNUP - Tier: ${tierType.toUpperCase()}`, {
    tier: tierType,
    verification: verificationLevel,
    monthlyRevenue: monthlyValue,
    annualValue: annualValue,
    leadPriority: AGENT_TIERS[tierType as keyof typeof AGENT_TIERS].leadPriority,
    agent: agentData,
    platformValue: `+$${annualValue} ARR (Annual Recurring Revenue)`
  });
};

export default function EliteAgentRegistrationPage() {
  const [selectedTier, setSelectedTier] = useState<string>('starter');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    license: '',
    yearsExperience: '',
    location: '',
    country: '',
    totalSales: '',
    avgTransactionValue: '',
    clientTestimonials: '',
    certifications: '',
    specialization: '',
    preferredPayment: '',
    verificationDocuments: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [verificationScore, setVerificationScore] = useState(0);

  // Auto-suggest tier based on experience and sales
  useEffect(() => {
    let score = 0;
    let suggestedTier = 'starter';

    // Calculate verification score
    if (formData.yearsExperience === '5-10' || formData.yearsExperience === '10+') score += 30;
    else if (formData.yearsExperience === '2-5') score += 15;

    if (formData.totalSales) {
      const sales = parseInt(formData.totalSales.replace(/[^0-9]/g, ''));
      if (sales >= 1000000) score += 40;
      else if (sales >= 500000) score += 25;
      else if (sales >= 100000) score += 15;
    }

    if (formData.clientTestimonials && parseInt(formData.clientTestimonials) >= 10) score += 20;
    else if (formData.clientTestimonials && parseInt(formData.clientTestimonials) >= 3) score += 10;

    if (formData.certifications) score += 10;

    setVerificationScore(score);

    // Suggest tier based on score
    if (score >= 70) suggestedTier = 'elite';
    else if (score >= 40) suggestedTier = 'certified';

    if (suggestedTier !== selectedTier && score > 15) {
      setSelectedTier(suggestedTier);
    }
  }, [formData, selectedTier]);

  // Get payment options based on country
  const getPaymentOptions = () => {
    return PAYMENT_OPTIONS[formData.country as keyof typeof PAYMENT_OPTIONS] || PAYMENT_OPTIONS["USA"];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tier = AGENT_TIERS[selectedTier as keyof typeof AGENT_TIERS];
    
    setTimeout(() => {
      const agentData = {
        ...formData,
        tier: selectedTier,
        verificationScore,
        agentId: `${tier.badge.replace(/[^\w]/g, '')}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        signupDate: new Date().toISOString(),
        monthlyRevenue: tier.price,
        leadPriority: tier.leadPriority
      };

      trackEliteSignup(selectedTier, agentData, tier.verification);
      setLoading(false);
      setStep(3);
    }, 2500);
  };

  const TierCard = ({ tier, tierKey }: { tier: any; tierKey: string }) => {
    const isSelected = selectedTier === tierKey;
    const isRecommended = tierKey === 'certified';

    return (
      <div className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
      }`} onClick={() => setSelectedTier(tierKey)}>
        
        {isRecommended && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
              MOST POPULAR
            </span>
          </div>
        )}
        
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{tier.badge}</div>
          <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
          <div className="mt-3">
            <span className="text-3xl font-bold text-blue-600">${tier.price}</span>
            <span className="text-gray-600">/month</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {tier.verification} Verification
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Requirements:</h4>
          <ul className="space-y-1">
            {tier.requirements.map((req: string, index: number) => (
              <li key={index} className="flex items-start text-xs text-gray-600">
                <span className="text-red-500 mr-2 mt-0.5">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Features:</h4>
          <ul className="space-y-1">
            {tier.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start text-xs">
                <span className="text-green-500 mr-2 mt-0.5">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <div className={`w-5 h-5 rounded-full border-2 mx-auto ${
            isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
          }`}></div>
        </div>
      </div>
    );
  };

  if (step === 3) {
    const tier = AGENT_TIERS[selectedTier as keyof typeof AGENT_TIERS];
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-center">
          <div className="text-6xl mb-4">{tier.badge}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Elite Network!</h2>
          <p className="text-gray-600 mb-6">
            Your {tier.name} application has been submitted for {tier.verification.toLowerCase()} verification.
            You'll receive access details within 24-48 hours.
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-bold text-green-600">${tier.price}/month</div>
                <div className="text-gray-600">Monthly Revenue</div>
              </div>
              <div>
                <div className="font-bold text-blue-600">Priority {tier.leadPriority}</div>
                <div className="text-gray-600">Lead Access</div>
              </div>
              <div>
                <div className="font-bold text-purple-600">{verificationScore}%</div>
                <div className="text-gray-600">Verification Score</div>
              </div>
              <div>
                <div className="font-bold text-orange-600">${tier.price * 12}</div>
                <div className="text-gray-600">Annual Value</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/agents/dashboard">
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all">
                Access Elite Dashboard
              </button>
            </Link>
            <Link href="/agents/verification">
              <button className="w-full border border-blue-300 text-blue-600 py-3 rounded-lg hover:bg-blue-50">
                Complete Verification Process
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <span className="text-sm text-gray-600">Elite Agent Platform</span>
              <Link href="/agents/login" className="text-gray-700 hover:text-blue-600">
                Agent Login
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Elite Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Join the Caribbean's Elite Agent Network</h1>
          <p className="text-xl mb-8">Quality-verified professionals serving premium Caribbean properties</p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold">$50M+</div>
              <div className="text-sm">Platform Valuation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm">Verified Elite Agents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold">$10M+</div>
              <div className="text-sm">Monthly Transaction Volume</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold">99.2%</div>
              <div className="text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {step === 1 && (
          <>
            <section className="mb-12">
              <h2 className="text-4xl font-bold text-center mb-4">Elite Agent Verification Tiers</h2>
              <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Our quality-controlled marketplace ensures only verified professionals represent Caribbean properties
              </p>
              
              <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {Object.entries(AGENT_TIERS).map(([key, tier]) => (
                  <TierCard key={key} tier={tier} tierKey={key} />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedTier}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Continue with {AGENT_TIERS[selectedTier as keyof typeof AGENT_TIERS]?.name} {AGENT_TIERS[selectedTier as keyof typeof AGENT_TIERS]?.badge}
                </button>
              </div>
            </section>
          </>
        )}

        {step === 2 && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-2">{AGENT_TIERS[selectedTier as keyof typeof AGENT_TIERS].badge}</div>
              <h2 className="text-3xl font-bold text-gray-800">Elite Agent Registration</h2>
              <p className="text-gray-600 mt-2">
                {AGENT_TIERS[selectedTier as keyof typeof AGENT_TIERS].name} - ${AGENT_TIERS[selectedTier as keyof typeof AGENT_TIERS].price}/month
              </p>
              {verificationScore > 0 && (
                <div className="mt-4 inline-block bg-blue-100 px-4 py-2 rounded-full">
                  <span className="text-blue-800 font-semibold">Verification Score: {verificationScore}%</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal & Professional Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Location & Experience */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Country</option>
                    <option value="Guyana">🇬🇾 Guyana</option>
                    <option value="Trinidad">🇹🇹 Trinidad & Tobago</option>
                    <option value="Jamaica">🇯🇲 Jamaica</option>
                    <option value="Barbados">🇧🇧 Barbados</option>
                    <option value="Suriname">🇸🇷 Suriname</option>
                    <option value="USA">🇺🇸 United States</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="UK">🇬🇧 United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                  <select
                    name="yearsExperience"
                    required
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-1">0-1 years (New Agent)</option>
                    <option value="2-5">2-5 years (Developing)</option>
                    <option value="5-10">5-10 years (Experienced)</option>
                    <option value="10+">10+ years (Expert)</option>
                  </select>
                </div>
              </div>

              {/* Sales Performance */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Career Sales Volume 💰
                  </label>
                  <select
                    name="totalSales"
                    value={formData.totalSales}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Sales Volume</option>
                    <option value="0-100000">Under $100,000</option>
                    <option value="100000-500000">$100K - $500K</option>
                    <option value="500000-1000000">$500K - $1M</option>
                    <option value="1000000-5000000">$1M - $5M (Elite Tier)</option>
                    <option value="5000000+">$5M+ (Ultra Elite)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Testimonials Count 🌟
                  </label>
                  <input
                    type="number"
                    name="clientTestimonials"
                    value={formData.clientTestimonials}
                    onChange={handleInputChange}
                    placeholder="Number of client testimonials"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              {formData.country && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {getPaymentOptions().map((payment, index) => (
                      <label key={index} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-white">
                        <input
                          type="radio"
                          name="preferredPayment"
                          value={payment.name}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{payment.icon}</span>
                            <span className="font-medium">{payment.name}</span>
                          </div>
                          <div className="text-sm text-gray-600">Processing fee: {payment.fee}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t">
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back to Tiers
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Elite Registration...
                      </span>
                    ) : (
                      `Join Elite Network - $${AGENT_TIERS[selectedTier as keyof typeof AGENT_TIERS].price}/month`
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}