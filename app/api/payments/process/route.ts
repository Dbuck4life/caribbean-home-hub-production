import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// NUCLEAR OPTION: Direct Prisma setup - NO EXTERNAL IMPORTS
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate payment data
    if (!body.amount || !body.listingId) {
      return NextResponse.json(
        { error: 'Missing payment information' },
        { status: 400 }
      );
    }

    // Verify listing exists (using 'property' table, 'id' field)
    const listing = await prisma.property.findUnique({
      where: { id: body.listingId }
    });

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Process payment (mock for now - will integrate Stripe)
    const mockPaymentSuccess = true; // Replace with real Stripe processing
    
    if (!mockPaymentSuccess) {
      return NextResponse.json(
        { error: 'Payment processing failed' },
        { status: 400 }
      );
    }

    // Record payment in database (using 'paymentRecord' table)
    const paymentRecord = await prisma.paymentRecord.create({
      data: {
        // Property reference (using 'propertyId' field)
        propertyId: body.listingId,
        
        // Payment details (matching PaymentRecord schema exactly)
        amount: parseFloat(body.amount),
        currency: "USD",
        status: "COMPLETED", // PaymentStatus enum value
        listingType: "RENTAL", // ListingType enum value
        
        // Customer info (required fields)
        customerEmail: body.customerEmail || "customer@example.com",
        customerName: body.customerName || "Customer",
        customerType: "landlord", // landlord, owner, or agent
        
        // Stripe integration fields
        stripePaymentId: `mock_${Date.now()}`, // Will be real Stripe ID
        stripeSessionId: `session_${Date.now()}`,
        
        // Timestamps
        createdAt: new Date(),
        paidAt: new Date(),
      },
    });

    console.log('💰 Payment processed successfully:', {
      paymentId: paymentRecord.id,
      amount: paymentRecord.amount,
      propertyId: paymentRecord.propertyId
    });

    return NextResponse.json({
      success: true,
      paymentId: paymentRecord.id,
      amount: paymentRecord.amount,
      message: 'Payment processed successfully!'
    });

  } catch (error) {
    console.error('❌ Payment processing failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Payment processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}