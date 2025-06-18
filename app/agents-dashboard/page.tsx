'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  propertyType: string
  contactName: string
  contactEmail: string
  contactPhone: string
  images: string[]
  createdAt: string
}

export default function AgentDashboard() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    // Check if user is authenticated as agent
    const userType = localStorage.getItem('userType')
    if (status === 'unauthenticated' || userType !== 'agent') {
      router.push('/agents-login')
      return
    }

    fetchProperties()
  }, [status, router])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      if (response.ok) {
        const data = await response.json()
        setProperties(data)
        setFilteredProperties(data)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = properties

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number)
      filtered = filtered.filter(property => {
        if (max) {
          return property.price >= min && property.price <= max
        }
        return property.price >= min
      })
    }

    if (typeFilter) {
      filtered = filtered.filter(property => property.propertyType === typeFilter)
    }

    setFilteredProperties(filtered)
  }, [searchTerm, priceFilter, typeFilter, properties])

  const handleContactOwner = (property: Property) => {
    setSelectedProperty(property)
    setShowContactModal(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('agentEmail')
    router.push('/agents-login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
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
              <Link href="/agents-dashboard" className="text-blue-600 font-medium">
                Properties
              </Link>
              <Link href="/agents-dashboard/advertise" className="text-gray-600 hover:text-gray-900">
                Advertise
              </Link>
              <Link href="/agents-dashboard/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Location or Title
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search properties..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-3000">$2,000 - $3,000</option>
                <option value="3000-99999">$3,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {property.images?.length > 0 ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                <p className="text-2xl font-bold text-blue-600 mb-2">${property.price.toLocaleString()}/month</p>
                <div className="flex text-sm text-gray-500 mb-4">
                  <span>{property.bedrooms} bed</span>
                  <span className="mx-2">•</span>
                  <span>{property.bathrooms} bath</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{property.propertyType}</span>
                </div>
                <button
                  onClick={() => handleContactOwner(property)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Contact Owner
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Contact Modal */}
      {showContactModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Property Owner</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Property:</span> {selectedProperty.title}
              </div>
              <div>
                <span className="font-medium">Owner:</span> {selectedProperty.contactName}
              </div>
              <div>
                <span className="font-medium">Email:</span> 
                <a href={`mailto:${selectedProperty.contactEmail}`} className="text-blue-600 hover:text-blue-700 ml-1">
                  {selectedProperty.contactEmail}
                </a>
              </div>
              <div>
                <span className="font-medium">Phone:</span> 
                <a href={`tel:${selectedProperty.contactPhone}`} className="text-blue-600 hover:text-blue-700 ml-1">
                  {selectedProperty.contactPhone}
                </a>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <a
                href={`mailto:${selectedProperty.contactEmail}?subject=Interest in ${selectedProperty.title}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition-colors"
              >
                Send Email
              </a>
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}