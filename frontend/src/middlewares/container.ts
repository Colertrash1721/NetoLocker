import { NextResponse, type NextRequest } from "next/server";

export function container(req: NextRequest){
    const token = req.cookies.get('authToken')?.value;
    const role = req.cookies.get('role')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/container') && role !== "company") {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next();
}