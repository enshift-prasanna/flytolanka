import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniquePackageSlug } from "@/lib/slug";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeDetailed = searchParams.get("detailed") === "true";
  const categoryId = searchParams.get("categoryId");

  const where = categoryId ? { categoryId } : {};

  const packages = await prisma.package.findMany({
    where,
    select: includeDetailed
      ? {
          id: true,
          slug: true,
          title: true,
          categoryId: true,
          days: true,
          price: true,
          shortDescription: true,
          detailedDescription: true,
          image: true,
          category: true,
        }
      : {
          id: true,
          slug: true,
          title: true,
          categoryId: true,
          days: true,
          price: true,
          shortDescription: true,
          image: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
  });

  return NextResponse.json(packages);
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
