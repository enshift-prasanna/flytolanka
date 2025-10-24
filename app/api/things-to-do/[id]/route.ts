import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { error: "Invalid things to do ID" },
      { status: 400 }
    );
  }
  const thingsToDo = await prisma.thingsToDo.findUnique({ where: { id } });
  if (!thingsToDo) {
    return NextResponse.json(
      { error: "Things to do not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(thingsToDo);
}
