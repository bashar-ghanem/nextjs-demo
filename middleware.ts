import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = ['/books', '/authors', '/publishers'].some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const authCookie = request.cookies.get('auth')?.value;
    
    if (authCookie !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
