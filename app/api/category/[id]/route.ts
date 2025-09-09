import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { packages: true },
    });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching category" }, { status: 500 });
  }
}
