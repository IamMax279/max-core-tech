import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization')
        if(!authHeader) {
            return NextResponse.json({ message: "Missing authorization" }, { status: 400 })
        }

        const body = await request.json()

        const response = await fetch(
            `${process.env.API_URL}/payments/purchase`,
            {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )

        const data = await response.json()
        return NextResponse.json(data, { status: data.status })
    } catch(error) {
        console.log("API route error:", error)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}