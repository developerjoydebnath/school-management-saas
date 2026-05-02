import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the paths that require authentication
const protectedPaths = [
  '/dashboard',
];

// Define paths that should not be accessible if already logged in
const authPaths = [
  '/login',
  '/forgot-password'
];

export function proxy(request: NextRequest) {
  // Read the auth token from cookies
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some(p => pathname.startsWith(p));
  const isAuthPath = authPaths.some(p => pathname.startsWith(p));

  // If the user attempts to access a protected route without being authenticated, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url);
    // Optionally preserve the path they were trying to access
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // If the user is already authenticated and tries to access login or forgot password, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
