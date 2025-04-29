import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const searchParams = url.searchParams
        const token = searchParams.get('token')

        if(!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 400 })
        }

        const response = await fetch(
            `${process.env.API_URL}/user/verify-email?token=${token}`
        )

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
    } catch(error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}