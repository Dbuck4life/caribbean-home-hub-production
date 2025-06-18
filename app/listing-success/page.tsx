'use client';

import { useRouter } from 'next/navigation';

export default function ListingSuccessPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 text-center">
      <div className="mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Listing Successfully Submitted!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Your rental property has been submitted for review. We'll notify you by email once it's approved and live.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">What Happens Next?</h2>
        
        <div className="space-y-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h3 className="font-medium text-blue-800">Review Process</h3>
              <p className="text-blue-700 text-sm">Our team reviews your listing for quality and accuracy (typically within 24 hours)</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h3 className="font-medium text-blue-800">Go Live</h3>
              <p className="text-blue-700 text-sm">Your listing becomes searchable across our Caribbean rental network</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h3 className="font-medium text-blue-800">Receive Inquiries</h3>
              <p className="text-blue-700 text-sm">Interested tenants contact you directly via email and phone</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-green-800 mb-3">💰 Payment Confirmed</h2>
        <p className="text-green-700 text-sm">
          Your $49 listing fee has been processed. You'll receive an email receipt shortly.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => router.push('/list-rental')}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          List Another Property
        </button>
        
        <button
          onClick={() => router.push('/')}
          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Return to Homepage
        </button>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-medium text-yellow-800 mb-2">Need Help?</h3>
        <p className="text-yellow-700 text-sm mb-3">
          Questions about your listing or the review process?
        </p>
        <a 
          href="mailto:support@caribbeanrentals.com" 
          className="text-yellow-800 hover:text-yellow-900 font-medium underline"
        >
          Contact Support →
        </a>
      </div>
    </div>
  );
}