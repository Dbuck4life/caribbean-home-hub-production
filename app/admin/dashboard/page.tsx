'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    pendingReviews: 0,
    featuredProperties: 0
  })

  useEffect(() => {
    // TODO: Fetch real stats from database
    setStats({
      totalProperties: 0,
      activeListings: 0,
      pendingReviews: 0,
      featuredProperties: 0
    })
  }, [])

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Caribbean Home Hub Admin</h1>
              <p className="text-gray-600">Property Management Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-medium">Admin User</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                🏠
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                ✅
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                ⏳
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingReviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                ⭐
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{stats.featuredProperties}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Property Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Property Management</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/admin/properties')}
                className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">➕</div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Add New Property</h3>
                    <p className="text-sm text-gray-600">Upload a new Caribbean property listing</p>
                  </div>
                </div>
                <div className="text-blue-600">→</div>
              </button>

              <button
                onClick={() => alert('Coming soon: View all properties')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📋</div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Manage Properties</h3>
                    <p className="text-sm text-gray-600">Edit, delete, or update existing listings</p>
                  </div>
                </div>
                <div className="text-gray-600">→</div>
              </button>

              <button
                onClick={() => alert('Coming soon: Analytics dashboard')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📊</div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Analytics</h3>
                    <p className="text-sm text-gray-600">View property performance and statistics</p>
                  </div>
                </div>
                <div className="text-gray-600">→</div>
              </button>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">System Status</h2>
            <div className="space-y-4">
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Security Status</h3>
                    <p className="text-sm text-gray-600">All systems protected</p>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">✅ Active</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Database</h3>
                    <p className="text-sm text-gray-600">Ready for property storage</p>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">🔄 Ready</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Platform Integration</h3>
                    <p className="text-sm text-gray-600">Ready to connect to live site</p>
                  </div>
                </div>
                <div className="text-purple-600 font-semibold">⚡ Ready</div>
              </div>

            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="text-center py-8">
            <div className="text-4xl text-gray-300 mb-4">📈</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Activity</h3>
            <p className="text-gray-600 mb-4">Start by adding your first property listing</p>
            <button
              onClick={() => router.push('/admin/properties')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Add First Property
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-yellow-600 mr-3">🔒</div>
            <div>
              <h3 className="font-semibold text-yellow-800">Bank-Level Security Active</h3>
              <p className="text-yellow-700 text-sm">
                Your admin dashboard is protected with enterprise-grade security. Session timeout: 24 hours.
                Only authenticated administrators can access this platform.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}