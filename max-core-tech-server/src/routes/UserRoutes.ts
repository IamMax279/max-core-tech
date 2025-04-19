import express, { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import * as jwt from "jsonwebtoken"
import { AuthService } from "../services/AuthService";
import { authMiddleware } from "../middleware/AuthMiddleware";

const userRouter = express.Router()

const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await UserController.registerUser(req.body)
        return res.status(result.success ? 201 : 400).json(result)
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
}

const verifyUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.query.token?.toString()
        if(!token) {
            throw new Error("no token in url query")
        }
        const result = await UserController.verifyUser(token)
        return res.status(result.success ? 201 : 400).json(result)
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error verifying user"
        })
    }
}

const isVerified = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.query.token?.toString()
        if(!token) {
            throw new Error("No token provided")
        }
        const result = await UserController.isVerified(token)
        return res.status((result.message === "User is verified." || result.message === "User is not verified.")
        ? 201 : 400).json(result)
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error checking if user is verified"
        })
    }
}

const signIn = async (req: Request, res: Response): Promise<any> => {
    try {
        const {email, password} = req.body
        const result = await UserController.signIn(email, password)
        return res.status(result.success ? 201 : 400).json(result)
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Server error signing user in"
        })
    }
}

const refreshToken = async (req: Request, res: Response): Promise<any> => {
    const { refresh } = req.body
    if(!refresh) {
        return res.status(400).json({
            success: false,
            message: "no refresh token provided"
        })
    }

    try {
        const decoded: any = jwt.verify(refresh, process.env.JWT_SECRET!)
        const newAccessToken = AuthService.generateAccessToken(decoded.userId)

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: `bad token format or token expired. ${error instanceof Error ? error.message : ''}`
        })
    }
}

const getUserData = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization?.substring(7)
        if(!token) {
            throw new Error("No token provided.")
        }
        const result = await UserController.getUserData(token)

        const {success, message, ...userData} = result

        return res.status(result.success ? 201 : 400).json({
            success,
            message,
            userData: success ? userData : {}
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Server error getting user data"
        })
    }
}

const addUserAddress = async (req: Request, res: Response): Promise<any> => {
    try {
        const { data, isTemporary } = req.body

        const result = await UserController.addUserAddress(data, isTemporary)
        return res.status(result.success ? 201 : 400).json(result)
    } catch(error) {
        return res.status(500).json(
            {
                success: false,
                message: "Server error adding user address"
            }
        )
    }
}

const verifyPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization?.substring(7)
        if(!token) {
            throw new Error("No token found.")
        }

        const { password } = req.body

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        const result = await UserController.verifyPassword(password, token)
        return res.status(result.success ? 201 : 400).json({result})
    } catch(error) {
        return res.status(500).json(
            {
                success: false,
                message: "Server error verifying user password."
            }
        )
    }
}

const changePassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization?.substring(7)
        if(!token) {
            throw new Error("No token found.")
        }

        const { password } = req.body

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }
        const result = await UserController.changePassword(password, token)
        return res.status(result.success ? 201 : 400).json({result})
    } catch(error) {
        return res.status(500).json(
            {
                success: false,
                message: "Server error changing user password."
            }
        )
    }
}

const deleteAccount = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization?.substring(7)
        if(!token) {
            throw new Error("Missing authorization.")
        }

        const { password } = req.body
        if(!password) {
            throw new Error("Missing password.")
        }
        const result = await UserController.deleteAccount(password, token)
        return res.status(result.success ? 200 : 401).json({result})
    } catch(error) {
        return res.status(500).json(
            {
                success: false,
                message: "Server error deleting user account."
            }
        )
    }
}

userRouter.post("/user/register", registerUser)
userRouter.post("/user/sign-in", signIn)
userRouter.post("/user/refresh-token", refreshToken)
userRouter.get("/user/verify-email", verifyUser)
userRouter.get("/user/is-verified", isVerified)
userRouter.get("/user/get-user-data",
    authMiddleware,
    getUserData
)
userRouter.post("/user/add-user-address",
    authMiddleware,
    addUserAddress
)
userRouter.post("/user/verify-password",
    authMiddleware,
    verifyPassword
)
userRouter.post("/user/delete-account",
    authMiddleware,
    deleteAccount
)
userRouter.patch("/user/change-password",
    authMiddleware,
    changePassword
)

export default userRouter