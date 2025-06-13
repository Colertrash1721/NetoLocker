import { NextResponse, type NextRequest } from "next/server";
import { roles } from "./middlewares/roles";
import { container } from "./middlewares/container";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return roles(request)
    }
    if (request.nextUrl.pathname.startsWith('/container')) {
        return container(request);
    }
    return NextResponse.next();
}