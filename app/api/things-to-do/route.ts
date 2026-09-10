import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniqueThingsToDoSlug } from "@/lib/slug";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeContent = searchParams.get("includeContent") === "true";
  const thingsToDo = await prisma.thingsToDo.findMany({
    orderBy: { createdAt: "desc" },
    select: includeContent
      ? undefined
      : {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          image: true,
          createdAt: true,
        },
  });
  return NextResponse.json(thingsToDo);
}

export async function POST(req: Request) {
  const data = await req.json();
  const slug = await generateUniqueThingsToDoSlug(data.slug || data.title);
  const thingsToDo = await prisma.thingsToDo.create({
    data: { ...data, slug },
  });
  return NextResponse.json(thingsToDo);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  if (rest.title || rest.slug) {
    rest.slug = await generateUniqueThingsToDoSlug(rest.slug || rest.title, id);
  }
  const thingsToDo = await prisma.thingsToDo.update({
    where: { id },
    data: rest,
  });
  return NextResponse.json(thingsToDo);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.thingsToDo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
