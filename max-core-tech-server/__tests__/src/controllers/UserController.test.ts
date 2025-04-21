import { UserController } from "../../../src/controllers/UserController";
import prisma from "../../../prisma/PrismaClient"
import argon2 from "argon2";
import { AuthService } from "../../../src/services/AuthService";

jest.mock("../../../prisma/PrismaClient", () => ({
    __esModule: true, //bo default export
    default: { //dlatego ze jest default export
        user: {
            create: jest.fn()
        }
    }
}));

jest.mock("argon2", () => ({
    hash: jest.fn()
}))

jest.mock("../../../src/services/AuthService", () => ({
    AuthService: {
      generateEmailToken: jest.fn(),
      sendVerificationEmail: jest.fn()
    }
}));

describe("UserController", () => {
    describe("registerUser", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })

        test("should create a user if all the fields were provided", async () => {
            const userData = {
                email: "random@mail.com",
                firstName: "John",
                lastName: "Doe",
                password: "Password123!"
            };

            (argon2.hash as any).mockImplementation(() => Promise.resolve("hashed-pass"));
    
            (prisma.user.create as any).mockImplementation(() => Promise.resolve({
                id: 1,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: "hashed_password",
                createdAt: new Date()
            }));
            
            (AuthService.generateEmailToken as any).mockImplementation(() => "email-token");
            
            (AuthService.sendVerificationEmail as any).mockImplementation(() => 
                Promise.resolve({
                    success: true,
                    message: "Email sent"
                })
            );

            const result = await UserController.registerUser(userData)

            expect(result).toEqual({
                success: true,
                message: "User added successfully + verification email sent."
            })
            expect(prisma.user.create).toHaveBeenCalled()
        })

        test("should return error when email is empty", async () => {
            const userData = {
                email: "  ",
                firstName: "John",
                lastName: "Doe",
                password: "Password123!"
            }

            const result = await UserController.registerUser(userData)

            expect(result).toEqual({
                success: false,
                message: "Some field(s) are empty"
            })
            expect(prisma.user.create).not.toHaveBeenCalled()
        })

        test("should return error if verification email was not sent", async () => {
            const userData = {
                email: "random@mail.com",
                firstName: "John",
                lastName: "Doe",
                password: "Password123!"
            };

            (argon2.hash as jest.Mock).mockImplementation(() => Promise.resolve("hashed-pass"));

            (prisma.user.create as jest.Mock).mockImplementation(() => Promise.resolve({
                id: 1,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: "hashed_pass",
                createdAt: new Date()
            }));

            (AuthService.generateEmailToken as jest.Mock).mockImplementation(() => undefined);
            
            (AuthService.sendVerificationEmail as jest.Mock).mockImplementation(() => 
                Promise.resolve({
                    success: false,
                    message: "email or token not provided"
                })
            );

            const result = await UserController.registerUser(userData)

            expect(AuthService.generateEmailToken).toHaveBeenCalled()
            expect(result).toEqual({
                success: false,
                message: "Failed to send verification email"
            })
        })
    })
})