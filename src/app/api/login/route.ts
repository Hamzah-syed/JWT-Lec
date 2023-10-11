import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from 'jose'

export const POST = async (request: NextRequest) => {
    let body = await request.json()
    let secret = new TextEncoder().encode('my-secure-secret123')
    
    if (body.email === 'admin@gmail.com' && body.password === "admin") {
        const jwt = await new SignJWT({ email: "admin@gmail.com" })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(secret)

        let response = NextResponse.json({ success: true })
        response.cookies.set({
            name: "token",
            value: jwt,
            httpOnly: true
        })
        return response
        // return NextResponse.json()
    }
    else {
        return NextResponse.json({ success: false })
    }

} 
