import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const searchParams = url.searchParams
    
        const token = searchParams.get('token')
        const authHeader = request.headers.get('Authorization')
    
        if(!token || !authHeader) {
            return NextResponse.json({ message: "Missing token or authorization" }, {status: 400})
        }
    
        const response = await fetch(
            `${process.env.API_URL}/auth/verify-token?token=${token}`,
            {
                headers: {
                    "Authorization": authHeader
                }
            }
        )
    
        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
    } catch(error) {
        console.log("API route error:", error)
        return NextResponse.json({ message: "Server error"})
    }
}