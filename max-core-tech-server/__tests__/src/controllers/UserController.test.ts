import { UserController } from "../../../src/controllers/UserController";
import prisma from "../../../prisma/PrismaClient"
import argon2 from "argon2";
import { AuthService } from "../../../src/services/AuthService";

jest.mock("../../../prisma/PrismaClient", () => ({
    __esModule: true, //bo default export
    default: { //dlatego ze jets default export
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
    })
})