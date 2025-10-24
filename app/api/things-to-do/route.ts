import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeContent = searchParams.get("includeContent") === "true";
  const thingsToDo = await prisma.thingsToDo.findMany();
  const filteredThingsToDo = includeContent
    ? thingsToDo
    : thingsToDo.map(({ content, ...rest }) => rest);
  return NextResponse.json(filteredThingsToDo);
}

export async function POST(req: Request) {
  const data = await req.json();
  const thingsToDo = await prisma.thingsToDo.create({ data });
  return NextResponse.json(thingsToDo);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
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
