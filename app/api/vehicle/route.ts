import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({})
    return NextResponse.json(vehicles)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
