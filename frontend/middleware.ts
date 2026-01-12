import { NextRequest, NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/tasks'];

export function middleware(request: NextRequest) {
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check if user is authenticated by looking for session token
    const token = request.cookies.get('better-auth-session');

    if (!token) {
      // Redirect to signin page if not authenticated
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Specify which paths the middleware should run for
export const config = {
  matcher: ['/tasks/:path*', '/dashboard/:path*'], // Adjust paths as needed
};