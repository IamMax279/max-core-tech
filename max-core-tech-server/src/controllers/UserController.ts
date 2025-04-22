import { RegisterData } from "../types/AuthTypes";
import { ConfidentialResponse, RestResponse } from "../types/ResponseTypes";
import prisma from "../../prisma/PrismaClient"
import * as argon2 from "argon2"
import * as jwt from "jsonwebtoken"
import { AuthService } from "../services/AuthService";
import { SignInResponse, UserDataResponse } from "../types/ResponseTypes";
import { UserAddress } from "../types/UserTypes";

export class UserController {
    static async registerUser(userData: RegisterData): Promise<RestResponse> {
        if(!userData.email.trim() || !userData.firstName.trim() || !userData.lastName.trim() || !userData.password.trim()) {
            return {
                success: false,
                message: "Some field(s) are empty"
            }
        }

        try {
            const hashedPassword = await argon2.hash(userData.password)

            const user = await prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword
                }
            })

            const token = AuthService.generateEmailToken(user.id.toString())
            const res = await AuthService.sendVerificationEmail(user.email, token)

            if(!res.success) {
                return {
                    success: false,
                    message: "Failed to send verification email"
                }
            }

            return {
                success: true,
                message: "User added successfully + verification email sent."
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error adding a user to the db."
            }
        }
    }

    static async verifyUser(token: string): Promise<RestResponse> {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
        try {
            await prisma.user.update({
                where: {id: BigInt(decoded.userId)},
                data: {verified: true}
            })

            return {
                success: true,
                message: "user verified successfully"
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "error verifying token"
            }
        }
    }

    static async isVerified(token: string): Promise<RestResponse> {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
        try {
            const userId = decoded.userId

            const user = await prisma.user.findFirst({
                where: {id: BigInt(userId)}
            })
            if(!user) {
                throw new Error("User not found.")
            }

            if(!user.verified) {
                return {
                    success: false,
                    message: "User is not verified."
                }
            } else {
                return {
                    success: true,
                    message: "User is verified."
                }
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "error checking if user is verified"
            }
        }
    }

    static async signIn(email: string, password: string): Promise<SignInResponse> {
        if(!email.trim() || !password.trim()) {
            return {
                success: false,
                message: "Some field(s) are empty."
            }
        }

        const user = await prisma.user.findFirst({
            where: {email: email}
        })
        if(!user) {
            return {
                success: false,
                message: "This user does not exist."
            }
        }
        if(!user.verified) {
            return {
                success: false,
                message: "user not verified"
            }
        }

        const correctPassword = await argon2.verify(user.password, password)
        if(!correctPassword) {
            return {
                success: false,
                message: "Incorrect password."
            }
        }

        const token = AuthService.generateAccessToken(user.id.toString())
        const refresh = AuthService.generateRefreshToken(user.id.toString())

        return {
            success: true,
            message: "Signed in successfully.",
            jwt: token,
            refresh: refresh
        }
    }

    static async getUserData(token: string): Promise<UserDataResponse> {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
            const user = await prisma.user.findFirst({
                where: {id: decoded.userId}
            })

            if(!user) {
                return {
                    success: false,
                    message: "This user does not exist."
                }
            }

            const userAddresses = await prisma.userAddresses.findMany({
                where: {userId: user.id},
                orderBy: {
                    createdAt: 'desc'
                }
            })

            const fixed = userAddresses.filter(address => address.isTemporary === false)
            const temporary = userAddresses.filter(address => address.isTemporary === true)

            if(userAddresses.length === 0) {
                return {
                    success: true,
                    message: "Only substantial data found.",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }

            if (temporary.length > 0 && fixed.length === 0) {
                const {id, createdAt, updatedAt, userId, ...data} = userAddresses[0]

                return {
                    success: true,
                    message: "Data found successfully.",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    addressId: id.toString()
                }
            }

            const {id, createdAt, updatedAt, userId, ...data} = fixed[0]

            return {
                success: true,
                message: "Data found successfully.",
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                addressId: fixed[0].id.toString(),
                userAddress: {
                    ...data,
                    userId: userId.toString(),
                }
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "error finding user"
            }
        }
    }

    static async addUserAddress(data: UserAddress, isTemporary: boolean): Promise<RestResponse> {
        if(!data.apt.trim() || !data.city.trim() || !data.phone.trim() || !data.street.trim() || !data.unit.trim() || !data.zipCode.trim() || !data.userId.trim()) {
            return {
                success: false,
                message: "Each field must be filled."
            }
        }

        try {
            const userAddress = await prisma.userAddresses.findFirst({
                where: {userId: BigInt(data.userId), isTemporary: false}
            })
            if(userAddress && !isTemporary) {
                const {userId, ...toUpdate} = data
                await prisma.userAddresses.update({
                    where: {id: userAddress.id},
                    data: {...toUpdate}
                })
                return {
                    success: true,
                    message: "Updated user address successfully."
                }
            }

            await prisma.userAddresses.create({
                data: {
                    ...data,
                    userId: BigInt(data.userId),
                    isTemporary: isTemporary
                }
            })

            return {
                success: true,
                message: "Added new user address successfully."
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "error adding a new address"
            }
        }
    }

    static async verifyPassword(password: string, token: string): Promise<ConfidentialResponse> {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
            const userId = decoded.userId

            const user = await prisma.user.findFirst({
                where: {id: BigInt(userId)}
            })
            if(!user) {
                return {
                    success: false,
                    message: "User not found."
                }
            }

            const isCorrect = await argon2.verify(user.password, password)
            if(isCorrect) {
                const t = AuthService.generateShortLiveToken(user.id.toString())

                return {
                    success: true,
                    message: "Correct password.",
                    token: t
                }
            } else {
                throw new Error("Incorrect password")
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error verifying password."
            }
        }
    }

    static async changePassword(password: string, token: string): Promise<RestResponse> {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
            const userId = decoded.userId
    
            const user = await prisma.user.findFirst({
                where: {id: BigInt(userId)}
            })
            if(!user) {
                return {
                    success: false,
                    message: "User not found."
                }
            }
    
            await prisma.user.update({
                where: {id: userId},
                data: {password: await argon2.hash(password)}
            })
    
            return {
                success: true,
                message: "Password changed successfully"
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error changing password."
            }
        }
    }

    static async sendPasswordChangeLink(token: string): Promise<ConfidentialResponse> {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
            const id = BigInt(decoded.userId)

            const user = await prisma.user.findFirst({
                where: {id: id}
            })
            if(!user) {
                throw new Error("This user does not exist.")
            }

            const res = await AuthService.sendPasswordChangeEmail(token)
            const t = AuthService.generateShortLiveToken(user.id.toString())

            if(res.success) {
                return {
                    success: true,
                    message: res.message,
                    token: t
                }
            } else {
                throw new Error(res.message)
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error sending password change email."
            }
        }
    }

    static async deleteAccount(password: string, token: string): Promise<RestResponse> {
        try {
            if(!password.trim() || !token.trim()) {
                throw new Error("Missing password or token.")
            }

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
            const userId = BigInt(decoded.userId)

            const user = await prisma.user.findFirst({
                where: {id: userId}
            })
            if(!user) {
                throw new Error("This user does not exist.")
            }

            const isCorrect = await argon2.verify(user.password, password)
            if(!isCorrect) {
                throw new Error("Incorrect password.")
            }

            const orders = await prisma.order.findMany({
                where: {userId: userId},
                select: {id: true}
            })

            if(orders.length > 0) {
                const orderIds = orders.map(order => order.id)
                await prisma.orderItem.deleteMany({
                    where: {orderId: {in: orderIds}}
                })
            }

            await prisma.order.deleteMany({
                where: {userId: userId}
            })

            await prisma.userAddresses.deleteMany({
                where: {userId: userId}
            })

            await prisma.user.delete({
                where: {id: userId}
            })

            return {
                success: true,
                message: "User deleted successfully"
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error deleting account."
            }
        }
    }
}