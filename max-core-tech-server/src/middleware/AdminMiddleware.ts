import { NextFunction, Request, Response } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { isAdmin } = req.body
    if(!isAdmin) {
        res.status(403).json({
            success: false,
            message: "UNAUTHORIZED"
        })
        return
    }
    next()
}