import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    if (token && request.nextUrl.pathname === '/api/login') {
        return NextResponse.json({ message: 'already logged in' })
    }

    if (!token?.value && request.nextUrl.pathname === '/api/dashboard') {
        // return NextResponse.redirect(new URL('/login', request.url))
        return NextResponse.json({ message: "Unauthorized" })
    }
    let secret = new TextEncoder().encode('my-secure-secret123')
    try {
        let verifiedToken = await jwtVerify(token?.value!, secret)
        NextResponse.next()
        // return NextResponse.json({ data: verifiedToken })
    }
    catch {
        return NextResponse.json({ message: "Unauthorized" })
        // return NextResponse.redirect(new URL('/login', request.url))
    }


    // NextResponse.next()
}

// export const config = { matcher: ['/dashboard'] }