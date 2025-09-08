import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const pkg = await prisma.package.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!pkg) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }
  return NextResponse.json(pkg);
}
