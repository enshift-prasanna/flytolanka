import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
  
  const pkg = await (prisma.package as any).findFirst({
    where: isObjectId
      ? { OR: [{ id }, { slug: id }] }
      : { slug: id },
    include: { category: true },
  });

  if (!pkg) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }
  return NextResponse.json(pkg);
}

