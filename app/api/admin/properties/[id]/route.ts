import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const property = await prisma.property.findUnique({
    where: { id: params.id }
  })

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 })
  }

  return NextResponse.json(property)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()

  try {
    const property = await prisma.property.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        descriptionRo: data.descriptionRo,
        status: data.status,
        transactionType: data.transactionType,
        propertyType: data.propertyType,
        price: data.price,
        currency: data.currency,
        area: data.area,
        rooms: data.rooms,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        floor: data.floor,
        buildingFloors: data.buildingFloors,
        yearBuilt: data.yearBuilt,
        city: data.city,
        street: data.street,
        streetNumber: data.streetNumber,
        building: data.building,
        apartment: data.apartment,
        brokerName: data.brokerName,
        brokerEmail: data.brokerEmail,
        brokerPhone: data.brokerPhone,
        images: data.images
      }
    })

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.property.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
