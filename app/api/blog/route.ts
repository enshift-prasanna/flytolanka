import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeContent = searchParams.get("includeContent") === "true";

  const blogs = await prisma.blog.findMany();
  const reversedBlogs = blogs.reverse(); // reverse order

  const filteredBlogs = includeContent
    ? reversedBlogs
    : reversedBlogs.map(({ content, ...rest }) => rest);
  
  return NextResponse.json(filteredBlogs);
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
