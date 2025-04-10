import { Request, Response, Router } from "express";
import { AuthService } from "../services/AuthService";
import { authMiddleware } from "../middleware/AuthMiddleware";

const authRouter = Router()

const verifyToken = (req: Request, res: Response): any => {
    try {
        const token = req.query.token?.toString()
        if(!token) {
            throw new Error("No token provided.")
        }

        const result = AuthService.verifyShortToken(token)
        if(!result) {
            throw new Error("Invalid token.")
        }
        return res.status(200).json({message: "Token verified successfully"})
    } catch(error) {
        return res.status(401).json({message: error instanceof Error ? error.message : "Server error verifying token"})
    }
}

const sendPasswordChangeLink = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization?.substring(7)
        if(!token) {
            throw new Error("Token not found.")
        }
        const result = await AuthService.sendPasswordChangeEmail(token)
        if(result.success) {
            return res.status(200).json(result)
        } else {
            throw new Error(`Something went wrong: ${result.message}`)
        }
    } catch(error) {
        console.log("Error sending password change link:", error)
        return res.status(400).json({
            success: false,
            message: "Server error sending password change link."
        })
    }
}

authRouter.get('/auth/verify-token',
    authMiddleware,
    verifyToken
)
authRouter.get('/auth/send-password-link',
    authMiddleware,
    sendPasswordChangeLink
)

export default authRouter