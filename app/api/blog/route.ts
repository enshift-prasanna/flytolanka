import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeContent = searchParams.get("includeContent") === "true";

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: includeContent
      ? undefined
      : {
          id: true,
          title: true,
          excerpt: true,
          image: true,
          createdAt: true,
        },
  });

  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const data = await req.json();
  const blog = await prisma.blog.create({ data });
  return NextResponse.json(blog);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  const blog = await prisma.blog.update({ where: { id }, data: rest });
  return NextResponse.json(blog);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.blog.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
