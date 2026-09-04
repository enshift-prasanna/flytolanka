import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { generateUniquePackageSlug } from "@/lib/slug";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeDetailed = searchParams.get("detailed") === "true";
  const packages = await prisma.package.findMany({
    include: {
      category: true
    }
  });
  const result = includeDetailed
    ? packages
    : packages.map(({ detailedDescription, ...rest }) => rest);
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const data = await req.json();
  const slug = await generateUniquePackageSlug(data.slug || data.title);
  const pkg = await prisma.package.create({
    data: { ...data, slug },
  });
  return NextResponse.json(pkg);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  if (rest.title || rest.slug) {
    rest.slug = await generateUniquePackageSlug(rest.slug || rest.title, id);
  }
  const pkg = await prisma.package.update({ where: { id }, data: rest });
  return NextResponse.json(pkg);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.package.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
