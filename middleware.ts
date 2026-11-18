import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, request) => {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Only apply restriction for /admin routes
  if (url.pathname.startsWith("/admin")) {
    const hostname = host.split(":")[0];
    const allowedHosts = [
      "flytolanka.vercel.app",
      "localhost",
      "127.0.0.1",
      "::1",
    ];

    if (!allowedHosts.includes(hostname)) {
      url.pathname = "/404";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/__clerk/:path*",
    "/(api|trpc)(.*)",
  ],
};
