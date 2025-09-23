import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  
  // Only apply restriction for /admin routes
  if (url.pathname.startsWith('/admin')) {
    // Allow only Vercel default domain
    if (host !== 'flytolanka.vercel.app') {
      url.pathname = '/404'; // Or you can return 403
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // only /admin routes
};