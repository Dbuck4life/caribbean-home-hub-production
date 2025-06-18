'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Package {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
}

const advertisingPackages: Package[] = [
  {
    id: 'basic',
    name: 'Basic Visibility',
    price: 29,
    duration: 'month',
    features: [
      'Featured in search results',
      'Contact form submissions',
      'Basic analytics dashboard',
      'Email support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    duration: 'month',
    features: [
      'Top search placement',
      'Priority contact routing',
      'Advanced analytics',
      'Custom agent profile',
      'Lead management tools',
      'Phone support'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Elite',
    price: 149,
    duration: 'month',
    features: [
      'Guaranteed top 3 placement',
      'Featured agent badge',
      'Custom branding options',
      'Lead automation',
      'Priority customer success',
      'Monthly strategy calls',
      'Advanced reporting suite'
    ]
  }
]

export default function AdvertisePage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [currentSubscription, setCurrentSubscription] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [stats, setStats] = useState({
    profileViews: 247,
    contactRequests: 18,
    activeListings: 5,
    responseRate: 94
  })
  
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    const userType = localStorage.getItem('userType')
    if (status === 'unauthenticated' || userType !== 'agent') {
      router.push('/agents-login')
      return
    }

    // Load current subscription status
    const subscription = localStorage.getItem('agentSubscription')
    setCurrentSubscription(subscription)
  }, [status, router])

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const handleUpgrade = async (packageId: string) => {
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store subscription
      localStorage.setItem('agentSubscription', packageId)
      setCurrentSubscription(packageId)
      setSelectedPackage(null)
      
      alert('Subscription upgraded successfully! Your enhanced visibility is now active.')
    } catch (error) {
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const getCurrentPackage = () => {
    return advertisingPackages.find(pkg => pkg.id === currentSubscription)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/agents-dashboard" className="text-gray-600 hover:text-gray-900">
                Properties
              </Link>
              <Link href="/agents-dashboard/advertise" className="text-blue-600 font-medium">
                Advertise
              </Link>
              <Link href="/agents-dashboard/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <button
                onClick={() => router.push('/agents-login')}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.profileViews}</div>
              <div className="text-sm text-gray-600">Profile Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.contactRequests}</div>
              <div className="text-sm text-gray-600">Contact Requests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.activeListings}</div>
              <div className="text-sm text-gray-600">Properties Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{stats.responseRate}%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </div>
          </div>
          
          {currentSubscription && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Current Plan: {getCurrentPackage()?.name}</h3>
                  <p className="text-sm text-blue-700">Your enhanced visibility is active</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-900">${getCurrentPackage()?.price}/month</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Advertising Packages */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Boost Your Visibility</h2>
            <p className="text-gray-600">Get more leads and grow your business with our advertising packages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advertisingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-lg border-2 p-6 transition-all hover:shadow-lg ${
                  pkg.popular
                    ? 'border-blue-500 bg-blue-50'
                    : currentSubscription === pkg.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {currentSubscription === pkg.id && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Current
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gray-900">
                    ${pkg.price}
                    <span className="text-base font-normal text-gray-600">/{pkg.duration}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(pkg.id)}
                  disabled={currentSubscription === pkg.id || isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    currentSubscription === pkg.id
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {isProcessing
                    ? 'Processing...'
                    : currentSubscription === pkg.id
                    ? 'Current Plan'
                    : currentSubscription
                    ? 'Upgrade Plan'
                    : 'Get Started'
                  }
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Need a custom solution? Contact our sales team for enterprise pricing.
            </p>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Why Advertise With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Daily Property Searches</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">85%</div>
                <div className="text-blue-100">Lead Conversion Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Platform Availability</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}