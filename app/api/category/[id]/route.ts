import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const categories = await prisma.category.findMany({
      include: { packages: true },
    });
    const category = categories.find((c: any) => c.id === id || c.slug === id);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error: any) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ error: error?.message || "Error fetching category" }, { status: 500 });
  }
}

