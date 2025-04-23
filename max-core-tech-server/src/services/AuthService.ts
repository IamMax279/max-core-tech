import * as jwt from "jsonwebtoken"
import * as nodemailer from "nodemailer"
import { RestResponse } from "../types/ResponseTypes"
import prisma from "../../prisma/PrismaClient"

export class AuthService {
    static generateAccessToken(userId: string): string {
        return jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: '30m'})
    }

    static generateEmailToken(userId: string): string {
        return jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: '1d'})
    }

    static generateRefreshToken(userId: string): string {
        return jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: '7d'})
    }

    static generateShortLiveToken(userId: string): string {
        return jwt.sign({userId}, process.env.SHORT_SECRET!, {expiresIn: '5m'})
    }

    static verifyShortToken(token: string): boolean {
        try {
            jwt.verify(token, process.env.SHORT_SECRET!)
            return true
        } catch(error) {
            return false
        }
    }

    static async sendVerificationEmail(email: string, token: string): Promise<RestResponse> {
        if(!email.trim() || !token.trim()) {
            return {
                success: false,
                message: "email or token not provided"
            }
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const clientURL = process.env.DOMAIN_URL;
        const url = `${clientURL}/verify-email?token=${token}`

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Email verification",
                html: `<p>Click the <a href="${url}">verification link</a> to verify your email.</p>`
            })

            return {
                success: true,
                message: "Email sent successfully"
            }
        } catch(error) {
            return {
                success: true,
                message: error instanceof Error ? error.message : "error sending email"
            }
        }
    }

    static async sendPasswordChangeEmail(token: string): Promise<RestResponse> {
        if(!token.trim()) {
            return {
                success: false,
                message: "email or token not provided"
            }
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
        const userId = decoded.userId

        const user = await prisma.user.findFirst({
            where: {id: BigInt(userId)}
        })
        if(!user) {
            throw new Error("User not found.")
        }

        const email = user.email

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const shortT = this.generateShortLiveToken(userId)

        const url = process.env.DOMAIN_URL + `/new-password?token=${shortT}&authT=${token}`
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Email verification",
                html: `<p>Click the <a href="${url}">password change link</a> to change your password.</p>`
            })

            return {
                success: true,
                message: "Email sent successfully"
            }
        } catch(error) {
            return {
                success: true,
                message: error instanceof Error ? error.message : "error sending email"
            }
        }
    }
}