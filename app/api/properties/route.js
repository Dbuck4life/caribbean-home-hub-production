import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    console.log('=== API ROUTE HIT ===');
    
    const body = await request.json();
    console.log('=== RECEIVED DATA ===');
    console.log(JSON.stringify(body, null, 2));
    
    // Test Prisma connection first
    console.log('=== TESTING PRISMA CONNECTION ===');
    await prisma.$connect();
    console.log('✅ Prisma connected successfully');
    
    // Test property count
    const count = await prisma.property.count();
    console.log('✅ Property table accessible, count:', count);
    
    // Now try to create property
    console.log('=== ATTEMPTING PROPERTY CREATE ===');
    const property = await prisma.property.create({
      data: {
        title: String(body.title),
        description: String(body.description),
        price: parseFloat(body.price) || 0,
        location: String(body.location),
        country: String(body.country),
        propertyType: String(body.propertyType || 'house'),
        bedrooms: parseInt(body.bedrooms) || 0,
        bathrooms: parseInt(body.bathrooms) || 0,
        squareFeet: parseInt(body.squareFeet) || 0,
        features: Array.isArray(body.features) ? body.features : [],
        status: String(body.status || 'available'),
        images: Array.isArray(body.images) ? body.images : []
      }
    });
    
    console.log('✅ Property created successfully:', property.id);
    
    return NextResponse.json({
      success: true,
      message: 'Property uploaded to database successfully!',
      property: property
    }, { status: 201 });
    
  } catch (error) {
    console.error('=== API ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json({
      success: false,
      error: 'API Error: ' + error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Properties API is working'
  });
}