'use client';

import React from 'react';
import { 
  MapPin, 
  Users, 
  Star, 
  TrendingUp, 
  Shield, 
  Heart,
  Award,
  Globe,
  DollarSign,
  Home,
  CheckCircle,
  Target
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '5', label: 'Caribbean Countries', icon: Globe },
    { number: '500+', label: 'Elite Agents', icon: Users },
    { number: '$50M+', label: 'Properties Listed', icon: DollarSign },
    { number: '98%', label: 'Customer Satisfaction', icon: Star }
  ];

  const teamMembers = [
    {
      name: 'Marcus Thompson',
      role: 'Founder & CEO',
      background: 'Former Caribbean Banking Executive',
      expertise: 'Real Estate Investment & Regional Markets',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Agent Relations',
      background: '15+ Years Real Estate Experience',
      expertise: 'Agent Training & Quality Assurance',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'David Chen',
      role: 'Technology Director',
      background: 'Former Zillow Lead Developer',
      expertise: 'PropTech & Platform Development',
      image: '/api/placeholder/150/150'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Every agent is verified through our 3-tier certification system, ensuring you work with qualified professionals.'
    },
    {
      icon: Heart,
      title: 'Caribbean Pride',
      description: 'We understand the unique culture, market dynamics, and opportunities across all Caribbean nations.'
    },
    {
      icon: Award,
      title: 'Excellence First',
      description: 'Our elite agent network and premium platform deliver results that exceed expectations.'
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'From lead generation to successful closings, we measure success by your success.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'Launched with vision to connect Caribbean real estate across borders'
    },
    {
      year: '2024',
      title: 'Multi-Country Expansion',
      description: 'Expanded to Guyana, Trinidad, Jamaica, Barbados, and Suriname'
    },
    {
      year: '2024',
      title: 'Elite Agent Network',
      description: 'Built comprehensive 3-tier agent verification and training system'
    },
    {
      year: '2025',
      title: 'Platform Leadership',
      description: 'Became the #1 professional Caribbean real estate platform'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            About Caribbean Home Hub
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            The first and only professional real estate platform serving the entire Caribbean region. 
            Connecting premium properties with global investors through our elite agent network.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <p className="text-lg font-medium">
                "Transforming Caribbean real estate, one connection at a time"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To create the most trusted and comprehensive real estate platform in the Caribbean, 
                connecting property seekers with verified professionals while celebrating the unique 
                culture and opportunities of each island nation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe every Caribbean property deserves professional representation, and every 
                buyer deserves access to the region's best opportunities, regardless of their location.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Caribbean Focus?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <span className="text-gray-700">Fastest-growing diaspora investment market</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <span className="text-gray-700">Underserved by global real estate platforms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <span className="text-gray-700">Unique market knowledge required</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <span className="text-gray-700">Strong cultural and family connections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Leadership Team</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Caribbean real estate experts with deep regional knowledge and global platform experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-green-100 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-16 w-16 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 mb-2">{member.background}</p>
                <p className="text-sm text-gray-500">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm mr-6 flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <MapPin className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Regional Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of each Caribbean market, from local regulations to cultural preferences.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <Shield className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Agents</h3>
              <p className="text-gray-600">
                3-tier agent certification system ensuring you work with qualified, experienced professionals.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <TrendingUp className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered</h3>
              <p className="text-gray-600">
                Smart property descriptions, lead scoring, and market analytics powered by cutting-edge AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Caribbean Home Hub Family?</h2>
          <p className="text-xl mb-8 leading-relaxed">
            Whether you're buying, selling, or representing properties, we're here to connect you 
            with the best opportunities across the Caribbean.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/list-property"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              List Your Property
            </a>
            <a
              href="/agents/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Become an Agent
            </a>
            <a
              href="/listings"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Properties
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}