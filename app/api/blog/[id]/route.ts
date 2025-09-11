import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  }
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json(blog);
}
