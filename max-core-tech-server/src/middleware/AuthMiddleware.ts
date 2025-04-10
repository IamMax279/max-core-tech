import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.substring(7)
    if(!token) {
        console.log("fwefwewef")
        res.status(403).json({
            success: false,
            message: "UNAUTHORIZED"
        })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        next()
    } catch(error) {
        console.log("error verifying jwt:", error)
        res.status(403).json({
            success: false,
            message: "UNAUTHORIZED"
        })
    }
}