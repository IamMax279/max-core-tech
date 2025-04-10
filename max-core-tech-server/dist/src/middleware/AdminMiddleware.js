"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    const { isAdmin } = req.body;
    if (!isAdmin) {
        res.status(403).json({
            success: false,
            message: "UNAUTHORIZED"
        });
        return;
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
