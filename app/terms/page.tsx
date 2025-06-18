'use client';

import React from 'react';
import { Scale, AlertCircle, Users, CreditCard } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Scale className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Caribbean Home Hub, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Description</h2>
            <p className="text-gray-700 mb-4">
              Caribbean Home Hub is a real estate platform connecting property buyers, sellers, and agents across 
              the Caribbean region. We provide listing services, agent verification, and property marketing tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must be at least 18 years old to use our services</li>
              <li>One person or entity may not maintain more than one account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Property Listings and FSBO Services</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">4.1 Listing Requirements</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>All property information must be accurate and truthful</li>
              <li>You must have legal authority to list the property</li>
              <li>Photos must be current and represent the actual property</li>
              <li>Pricing must be in good faith</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">4.2 Property Data Rights and Usage</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-blue-800 font-semibold mb-2">Important: Property Data Rights</p>
                  <ul className="list-disc pl-4 text-blue-700 text-sm">
                    <li><strong>Data Ownership:</strong> Any property information, descriptions, images, or data uploaded to Caribbean Home Hub becomes part of our platform database and may be used for platform operations, marketing, and business purposes</li>
                    <li><strong>Publication Rights:</strong> Caribbean Home Hub reserves the right to determine listing visibility, placement, and publication based on subscription status and platform policies</li>
                    <li><strong>Data Retention:</strong> Property data uploaded remains accessible to Caribbean Home Hub for platform improvement and marketing purposes, regardless of subscription status</li>
                    <li><strong>Marketing Usage:</strong> We may use property data for promotional materials, market analysis, and platform enhancement</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">4.3 Freemium Model & Listing Publication</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-green-800 font-semibold mb-2">Listing Creation vs. Publication</p>
                  <ul className="list-disc pl-4 text-green-700 text-sm">
                    <li><strong>Free Registration:</strong> Includes profile creation and listing preparation at no cost</li>
                    <li><strong>Listing Creation:</strong> Users may create and save property listings without payment</li>
                    <li><strong>Publication Requirement:</strong> Active subscription package required for listings to become publicly visible</li>
                    <li><strong>Draft Status:</strong> Unpaid listings remain in "draft" status and are not publicly searchable</li>
                    <li><strong>No Refund for Created Content:</strong> Time and effort invested in creating listings does not entitle users to free publication</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">4.4 Listing Fees</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Basic Listing: $25 for 30 days</li>
              <li>Premium Listing: $75 for 60 days</li>
              <li>Elite Listing: $150 for 90 days</li>
              <li>All fees are non-refundable unless otherwise specified</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Agent Services and Verification</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">5.1 Agent Registration and Data Rights</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <Users className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-purple-800 font-semibold mb-2">Agent Profile and Content Rights</p>
                  <ul className="list-disc pl-4 text-purple-700 text-sm">
                    <li><strong>Profile Information:</strong> All agent profile data, credentials, and professional information becomes part of our platform database</li>
                    <li><strong>Client Lead Rights:</strong> Contact information and leads generated through our platform remain our intellectual property</li>
                    <li><strong>Performance Data:</strong> Sales statistics, client reviews, and performance metrics may be used for platform analytics and marketing</li>
                    <li><strong>Professional Content:</strong> Agent-created descriptions, marketing materials, and content may be used for platform improvement</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">5.2 Agent Tiers</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Basic Agent: $35/month - Basic verification</li>
              <li>Premium Agent: $75/month - Enhanced verification</li>
              <li>Elite Agent: $150/month - Full verification and priority</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">5.3 Verification Process</h3>
            <p className="text-gray-700 mb-4">
              Agents must provide valid licensing, insurance, and professional credentials. 
              We reserve the right to verify and approve all agent applications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Advertising Services and Third-Party Business Listings</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">6.1 Advertising Content and Liability</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-red-800 font-semibold mb-2">Critical: Advertising Disclaimer</p>
                  <ul className="list-disc pl-4 text-red-700 text-sm">
                    <li><strong>No Endorsement:</strong> Caribbean Home Hub does not endorse, verify, or guarantee any third-party advertisers, their services, or business practices</li>
                    <li><strong>Advertiser Responsibility:</strong> All advertising content, claims, and business practices are solely the responsibility of the advertiser</li>
                    <li><strong>User Due Diligence:</strong> Users interact with advertisers at their own risk and must conduct their own verification</li>
                    <li><strong>No Liability for Advertiser Actions:</strong> We are not responsible for any losses, damages, or disputes arising from interactions with advertisers</li>
                    <li><strong>Content Standards:</strong> Advertisers must comply with all local laws and our platform guidelines</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">6.2 Advertising Placement and Performance</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>No Performance Guarantees:</strong> We do not guarantee specific results, leads, or business outcomes from advertising</li>
              <li><strong>Placement Discretion:</strong> Ad placement, timing, and visibility are determined by our algorithms and business needs</li>
              <li><strong>Content Modification:</strong> We reserve the right to edit, reject, or remove advertising content that violates our standards</li>
              <li><strong>Competition Handling:</strong> Multiple advertisers may compete in the same market/category</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">6.3 Advertiser Obligations</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Maintain all required business licenses and insurance</li>
              <li>Comply with local Caribbean business regulations</li>
              <li>Provide accurate business information and credentials</li>
              <li>Honor all commitments made to platform users</li>
              <li>Indemnify Caribbean Home Hub against any claims arising from their services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment Terms</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>All payments are processed securely through third-party payment processors</li>
              <li>Subscription fees are billed monthly or as specified</li>
              <li>Failed payments may result in service suspension</li>
              <li>Refunds are handled on a case-by-case basis</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Investment Program Disclaimers</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-semibold mb-2">Important Investment Program Notice:</p>
                  <ul className="list-disc pl-4 text-yellow-700 text-sm">
                    <li>Property investment program eligibility varies by country and program</li>
                    <li>We do not guarantee citizenship or residency outcomes</li>
                    <li>Consult qualified immigration attorneys for legal advice</li>
                    <li>All investment decisions are made at your own risk</li>
                    <li>Program requirements and laws may change without notice</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">You may not use our platform to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Post false, misleading, or fraudulent property information</li>
              <li>Engage in any illegal activities</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to circumvent our fees or payment systems</li>
              <li>Use automated systems to scrape or collect data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Caribbean Home Hub platform, including its design, features, and content, is protected by 
              intellectual property laws. Users retain rights to their own content but grant us license to use 
              it for platform operations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Caribbean Home Hub provides the platform "as is" without warranties. We are not liable for any 
              indirect, incidental, or consequential damages arising from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to terminate or suspend accounts that violate these terms. 
              Users may terminate their accounts at any time through their account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These terms are governed by the laws of the jurisdiction where Caribbean Home Hub operates. 
              Any disputes will be resolved through binding arbitration.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms of Service, contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">Email: legal@caribbeanhomehub.com</p>
              <p className="text-gray-700">Website: www.caribbeanhomehub.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}