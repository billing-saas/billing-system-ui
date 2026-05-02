import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    // Récupère le cookie auth-storage
    const authStorage = request.cookies.get("auth-storage")?.value;

    // Parse le JSON pour extraire le token
    let token = null;
    if (authStorage) {
        try {
            const parsed = JSON.parse(decodeURIComponent(authStorage));
            token = parsed?.state?.token ?? null;
        } catch {
            token = null;
        }
    }

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};