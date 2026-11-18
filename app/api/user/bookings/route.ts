import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const primaryEmail = user.emailAddresses?.[0]?.emailAddress?.toLowerCase();

    // Solution 1: Auto-link any past guest bookings that were made with this email address
    if (primaryEmail) {
      await (prisma.booking as any).updateMany({
        where: {
          customerEmail: { equals: primaryEmail, mode: "insensitive" },
          clerkUserId: null,
        },
        data: {
          clerkUserId: userId,
        },
      });
    }

    // Retrieve all bookings belonging to this user (by clerkUserId or matching email)
    const bookings = await (prisma.booking as any).findMany({
      where: {
        OR: [
          { clerkUserId: userId },
          ...(primaryEmail
            ? [{ customerEmail: { equals: primaryEmail, mode: "insensitive" } }]
            : []),
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
