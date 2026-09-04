import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { generateUniqueCategorySlug } from "@/lib/slug";

const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const data = await req.json();
  const slug = await generateUniqueCategorySlug(data.slug || data.name);
  const category = await prisma.category.create({
    data: { ...data, slug },
  });
  return NextResponse.json(category);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  if (rest.name || rest.slug) {
    rest.slug = await generateUniqueCategorySlug(rest.slug || rest.name, id);
  }
  const category = await prisma.category.update({ where: { id }, data: rest });
  return NextResponse.json(category);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
