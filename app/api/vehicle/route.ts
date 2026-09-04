import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({})
    return NextResponse.json(vehicles)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
