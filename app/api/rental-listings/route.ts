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
    console.log('📝 Received form data:', JSON.stringify(body, null, 2));
    // Validate required fields
    const requiredFields = ['propertyType', 'address', 'contactEmail'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create rental listing in database
    const rental = await prisma.property.create({
     data: {
  // Required fields from your Property schema
  title: `${body.propertyType} - ${body.address}`,
  description: body.description || '',
  propertyType: body.propertyType,
  price: 49, // Default $49 listing fee
  bedrooms: parseInt(body.bedrooms) || 1,
  bathrooms: parseInt(body.bathrooms) || 1,
  
  // Location fields
  country: "Caribbean", // Default value
  address: body.address,
  
  // Business model fields
  listingType: 'RENTAL',
  paymentStatus: 'PENDING',
  approvalStatus: 'PENDING', // Instead of 'approved: false'
  listingFee: 49.0,
  
  // Required relation field
user: {
  connectOrCreate: {
    where: { email: body.contactEmail },
    create: {
      email: body.contactEmail,
      name: body.contactName
    }
  }
},
  
  // Contact info - store in description or separate field
 agentEmail: body.contactEmail,
  
  createdAt: new Date(),
},
    });

    console.log('✅ Rental listing created:', rental.id);
    
    return NextResponse.json({ 
      success: true, 
      listingId: rental.id,
      message: 'Rental listing submitted successfully. Awaiting approval.'
    });

  } catch (error) {
    console.error('❌ Rental listing creation failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create rental listing',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}