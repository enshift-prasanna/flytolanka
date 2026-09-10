import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { error: "Invalid things to do ID" },
      { status: 400 }
    );
  }

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  const thingsToDo = await (prisma.thingsToDo as any).findFirst({
    where: isObjectId
      ? { OR: [{ id }, { slug: id }] }
      : { slug: id },
  });

  if (!thingsToDo) {
    return NextResponse.json(
      { error: "Things to do not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(thingsToDo);
}

