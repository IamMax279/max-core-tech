import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const response = await fetch(
            `${process.env.API_URL}/user/sign-in`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
    } catch(error) {
        console.log("API route error:", error)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}