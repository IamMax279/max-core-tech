import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization')
        if(!authHeader) {
            return NextResponse.json({ message: "Missing authorization" }, { status: 400 })
        }

        const response = await fetch(
            `${process.env.API_URL}/auth/send-password-link`,
            {
                headers: {
                    'Authorization': authHeader
                }
            }
        )

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
    } catch(error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}