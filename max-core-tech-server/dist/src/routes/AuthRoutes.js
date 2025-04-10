"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthService_1 = require("../services/AuthService");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const authRouter = (0, express_1.Router)();
const verifyToken = (req, res) => {
    var _a;
    try {
        const token = (_a = req.query.token) === null || _a === void 0 ? void 0 : _a.toString();
        if (!token) {
            throw new Error("No token provided.");
        }
        const result = AuthService_1.AuthService.verifyShortToken(token);
        if (!result) {
            throw new Error("Invalid token.");
        }
        return res.status(200).json({ message: "Token verified successfully" });
    }
    catch (error) {
        return res.status(401).json({ message: error instanceof Error ? error.message : "Server error verifying token" });
    }
};
const sendPasswordChangeLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.substring(7);
        if (!token) {
            throw new Error("Token not found.");
        }
        const result = yield AuthService_1.AuthService.sendPasswordChangeEmail(token);
        if (result.success) {
            return res.status(200).json(result);
        }
        else {
            throw new Error(`Something went wrong: ${result.message}`);
        }
    }
    catch (error) {
        console.log("Error sending password change link:", error);
        return res.status(400).json({
            success: false,
            message: "Server error sending password change link."
        });
    }
});
authRouter.get('/auth/verify-token', AuthMiddleware_1.authMiddleware, verifyToken);
authRouter.get('/auth/send-password-link', AuthMiddleware_1.authMiddleware, sendPasswordChangeLink);
exports.default = authRouter;
