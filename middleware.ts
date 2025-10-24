import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Only apply restriction for /admin routes
  if (url.pathname.startsWith("/admin")) {
    // Allow Vercel domain and local development hosts
    const hostname = host.split(":")[0]; // remove port if present
    const allowedHosts = [
      "flytolanka.vercel.app",
      "localhost",
      "127.0.0.1",
      "::1",
    ];

    if (!allowedHosts.includes(hostname)) {
      url.pathname = "/404"; // Or return 403
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // only /admin routes
};
