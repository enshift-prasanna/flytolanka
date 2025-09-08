import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET() {
  const packages = await prisma.package.findMany({ include: { category: true } });
  return NextResponse.json(packages);
}

export async function POST(req: Request) {
  const data = await req.json();
  const pkg = await prisma.package.create({ data });
  return NextResponse.json(pkg);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  const pkg = await prisma.package.update({ where: { id }, data: rest });
  return NextResponse.json(pkg);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.package.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
