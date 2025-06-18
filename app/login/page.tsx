'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Lead Capture Analytics
const trackLead = (source: string, userData: any) => {
  console.log(`🎯 LEAD CAPTURED via ${source}:`, userData);
  // This is where you'd send to your CRM/database
  // For now, we're logging to see the lead capture working
};

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    interestedIn: 'buying', // buying, selling, renting, investing
    budget: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    // Simulate Google OAuth (in production, use real Google API)
    setTimeout(() => {
      const googleUserData = {
        email: 'user@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        source: 'Google',
        timestamp: new Date().toISOString(),
        interestedIn: 'Caribbean Real Estate',
        leadValue: '$50' // What you can sell this lead for
      };
      
      trackLead('Google Sign-In', googleUserData);
      setLeadCaptured(true);
      setLoading(false);
      alert('🎉 Google Sign-in Successful! Lead captured for agent marketplace!');
    }, 1500);
  };

  // Facebook Login Handler  
  const handleFacebookLogin = async () => {
    setLoading(true);
    
    // Simulate Facebook OAuth (in production, use real Facebook API)
    setTimeout(() => {
      const facebookUserData = {
        email: 'user@facebook.com',
        firstName: 'Maria',
        lastName: 'Rodriguez', 
        source: 'Facebook',
        timestamp: new Date().toISOString(),
        interestedIn: 'Caribbean Properties',
        location: 'Caribbean Diaspora',
        leadValue: '$75' // Facebook leads often convert better
      };
      
      trackLead('Facebook Login', facebookUserData);
      setLeadCaptured(true);
      setLoading(false);
      alert('🎉 Facebook Login Successful! High-value lead captured!');
    }, 1500);
  };

  // Enhanced Form Submit with Lead Tracking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Capture form data as lead
    const leadData = {
      ...formData,
      source: 'Direct Registration',
      timestamp: new Date().toISOString(),
      leadScore: calculateLeadScore(formData),
      leadValue: '$25-$100' // Depending on lead quality
    };
    
    setTimeout(() => {
      trackLead('Form Registration', leadData);
      setLeadCaptured(true);
      setLoading(false);
      console.log(isLogin ? 'Login submitted' : 'Registration submitted', formData);
      alert(isLogin ? '✅ Login successful! Welcome back!' : '🎉 Registration successful! Lead captured!');
    }, 1500);
  };

  // Lead Scoring Algorithm (Million-dollar feature)
  const calculateLeadScore = (data: any) => {
    let score = 0;
    if (data.phone) score += 30; // Phone = serious buyer
    if (data.budget) score += 25; // Budget specified = qualified
    if (data.interestedIn === 'buying') score += 20; // Buying = highest value
    if (data.location) score += 15; // Location = targeted lead
    if (data.email) score += 10; // Email = minimum qualification
    return score;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // WhatsApp Lead Capture
  const handleWhatsAppLead = () => {
    const whatsappLeadData = {
      source: 'WhatsApp Button',
      timestamp: new Date().toISOString(),
      intent: 'Quick Contact',
      urgency: 'High',
      leadValue: '$30-$60'
    };
    
    trackLead('WhatsApp Contact', whatsappLeadData);
    
    const message = `Hi! I'm interested in Caribbean Home Hub properties. I'd like to get started quickly and learn about available properties.`;
    window.open(`https://wa.me/5925551234?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-green-500 to-yellow-400">
      {/* Lead Capture Banner */}
      {leadCaptured && (
        <div className="bg-green-600 text-white text-center py-2 text-sm font-semibold">
          🎯 Lead Captured Successfully! Our Caribbean experts will contact you within 24 hours.
        </div>
      )}

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-white hover:text-yellow-200 transition-colors">
                Caribbean Home Hub
              </h1>
            </Link>
            <Link href="/" className="text-white hover:text-yellow-200">
              ← Back to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Login/Register Form */}
      <div className="flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome Back' : 'Start Your Caribbean Investment Journey'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Access premium Caribbean properties and exclusive deals' 
                : 'Join thousands of successful Caribbean property investors'
              }
            </p>
          </div>

          {/* Social Login - The Million Dollar Feature */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500 bg-white px-3">Quick Access</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mb-4">
              {/* Google Sign-In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium">Continue with Google</span>
              </button>

              {/* Facebook Login */}
              <button
                onClick={handleFacebookLogin}
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-medium">Continue with Facebook</span>
              </button>


            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLogin 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="john@example.com"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                  <p className="text-xs text-blue-600 mt-1">💰 Phone leads sell for $50-100 to agents</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    I'm interested in *
                  </label>
                  <select
                    name="interestedIn"
                    required
                    value={formData.interestedIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="buying">Buying Property</option>
                    <option value="selling">Selling Property</option>
                    <option value="renting">Renting Property</option>
                    <option value="investing">Investment Opportunities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select Budget</option>
                    <option value="under-100k">Under $100,000</option>
                    <option value="100k-250k">$100,000 - $250,000</option>
                    <option value="250k-500k">$250,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1,000,000</option>
                    <option value="over-1m">Over $1,000,000</option>
                  </select>
                  <p className="text-xs text-green-600 mt-1">💎 Budget leads worth $75-150 to agents</p>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
                minLength={8}
              />
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account & Capturing Lead...'}
                </div>
              ) : (
                isLogin ? 'Sign In to Browse Premium Properties' : 'Start Your Caribbean Investment Journey'
              )}
            </button>
          </form>

          {/* Expert Help Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-center mb-3">
              <h3 className="text-sm font-semibold text-blue-800">🏝️ Need Help Finding the Right Property?</h3>
              <p className="text-xs text-blue-600 mt-1">
                Talk to our Caribbean real estate experts for personalized recommendations
              </p>
            </div>
            
            <button
              onClick={handleWhatsAppLead}
              className="w-full flex items-center justify-center py-3 px-4 border border-green-600 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="font-medium">Chat with Caribbean Expert</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</Link>{' '}
              and <Link href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}