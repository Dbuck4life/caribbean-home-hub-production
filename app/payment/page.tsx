'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const listingId = searchParams.get('listingId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (!listingId || !amount) {
      router.push('/');
    }
  }, [listingId, amount, router]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing (replace with real Stripe integration)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update payment status in database
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId,
          amount: parseFloat(amount || '0'),
          paymentMethod: 'credit_card'
        }),
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      setPaymentComplete(true);
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/listing-success');
      }, 3000);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentComplete) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-green-50 border border-green-200 rounded-lg text-center">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
        <p className="text-green-700 mb-4">
          Your rental listing has been submitted for review. You'll receive an email confirmation shortly.
        </p>
        <p className="text-sm text-green-600">
          Redirecting to confirmation page...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h1>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Rental Listing Fee</h3>
        <div className="flex justify-between items-center">
          <span className="text-blue-700">Listing Publication</span>
          <span className="font-bold text-blue-800">${amount}</span>
        </div>
        
        <div className="mt-3 pt-3 border-t border-blue-200">
          <div className="flex justify-between items-center font-bold">
            <span className="text-blue-800">Total</span>
            <span className="text-blue-800">${amount}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">What you get:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            30-day active listing
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Direct tenant inquiries
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Caribbean-wide exposure
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Professional listing optimization
          </li>
        </ul>
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </div>
        ) : (
          `Pay $${amount} Now`
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Secure payment processing • SSL encrypted • Cancel anytime
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 text-sm underline"
        >
          ← Back to listing form
        </button>
      </div>
    </div>
  );
}