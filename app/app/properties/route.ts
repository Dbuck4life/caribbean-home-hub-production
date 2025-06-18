import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Global Prisma instance to prevent connection issues
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function GET(request: NextRequest) {
  try {
    const properties = await prisma.property.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Use your comprehensive schema fields
    const property = await prisma.property.create({
      data: {
        // Basic Information
        title: body.title,
        description: body.description,
        propertyType: body.propertyType,
        listingStatus: body.listingStatus || "active",
        featured: body.featured || false,
        
        // Location
        country: body.country,
        island: body.island,
        parishRegion: body.parishRegion,
        areaDistrict: body.areaDistrict,
        address: body.address,
        
        // Property Details
        bedrooms: body.bedrooms ? parseInt(body.bedrooms) : null,
        bathrooms: body.bathrooms ? parseFloat(body.bathrooms) : null,
        squareFeet: body.squareFeet ? parseInt(body.squareFeet) : null,
        
        // Financial
        price: parseInt(body.price),
        priceLocalCurrency: body.priceLocalCurrency ? parseInt(body.priceLocalCurrency) : null,
        localCurrency: body.localCurrency,
        
        // Agent Information (your existing fields)
        agentName: body.agentName,
        agentEmail: body.agentEmail,
        agentPhone: body.agentPhone,
        agentAgency: body.agentAgency,
        
        // Business Model
        listingType: body.listingType,
        paymentStatus: body.paymentStatus || "PENDING",
        approvalStatus: body.approvalStatus || "PENDING",
        listingFee: body.listingFee ? parseFloat(body.listingFee) : null,
        
        // Required relation
        userId: body.userId // This is required in your schema
      }
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}