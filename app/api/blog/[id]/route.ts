import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  }

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  const blog = await (prisma.blog as any).findFirst({
    where: isObjectId
      ? { OR: [{ id }, { slug: id }] }
      : { slug: id },
  });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json(blog);
}

