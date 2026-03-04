import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const role = request.cookies.get("userRole")?.value;
    const { pathname } = request.nextUrl;

    // 1. Define routes that require authentication
    const protectedRoutes = ["/dashboard", "/users", "/bookings", "/settings", "/event"];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    // 2. Redirect unauthenticated users or non-admins to home/login
    if (isProtectedRoute) {
        if (role !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }

    // 3. Optional: Redirect authenticated admins away from login page to dashboard
    if (pathname === "/" && role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Match all the routes that need protection + the login page ("/")
    matcher: [
        "/",
        "/dashboard/:path*",
        "/users/:path*",
        "/bookings/:path*",
        "/settings/:path*",
        "/event/:path*",
    ],
};
