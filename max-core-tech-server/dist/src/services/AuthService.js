"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const nodemailer = __importStar(require("nodemailer"));
const PrismaClient_1 = __importDefault(require("../../prisma/PrismaClient"));
class AuthService {
    static generateAccessToken(userId) {
        return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30m' });
    }
    static generateRefreshToken(userId) {
        return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    }
    static generateShortLiveToken(userId) {
        return jwt.sign({ userId }, process.env.SHORT_SECRET, { expiresIn: '5m' });
    }
    static verifyShortToken(token) {
        try {
            jwt.verify(token, process.env.SHORT_SECRET);
            return true;
        }
        catch (error) {
            console.log("error verifying jwt:", error);
            return false;
        }
    }
    static sendVerificationEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email.trim() || !token.trim()) {
                return {
                    success: false,
                    message: "email or token not provided"
                };
            }
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            // const url = `http://localhost:3001/user/verify-email?token=${token}`
            const url = `http://localhost:3000/verify-email?token=${token}`;
            try {
                yield transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "Email verification",
                    html: `<p>Click the <a href="${url}">verification link</a> to verify your email.</p>`
                });
                return {
                    success: true,
                    message: "Email sent successfully"
                };
            }
            catch (error) {
                return {
                    success: true,
                    message: error instanceof Error ? error.message : "error sending email"
                };
            }
        });
    }
    static sendPasswordChangeEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token.trim()) {
                return {
                    success: false,
                    message: "email or token not provided"
                };
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;
            const user = yield PrismaClient_1.default.user.findFirst({
                where: { id: BigInt(userId) }
            });
            if (!user) {
                throw new Error("User not found.");
            }
            const email = user.email;
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            const shortT = this.generateShortLiveToken(userId);
            const url = `http://localhost:3000/new-password?token=${shortT}&authT=${token}`;
            try {
                yield transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "Email verification",
                    html: `<p>Click the <a href="${url}">password change link</a> to change your password.</p>`
                });
                return {
                    success: true,
                    message: "Email sent successfully"
                };
            }
            catch (error) {
                return {
                    success: true,
                    message: error instanceof Error ? error.message : "error sending email"
                };
            }
        });
    }
}
exports.AuthService = AuthService;
