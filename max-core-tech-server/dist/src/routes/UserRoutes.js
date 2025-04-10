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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const jwt = __importStar(require("jsonwebtoken"));
const AuthService_1 = require("../services/AuthService");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const userRouter = express_1.default.Router();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield UserController_1.UserController.registerUser(req.body);
        return res.status(result.success ? 201 : 400).json(result);
    }
    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
});
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.query.token) === null || _a === void 0 ? void 0 : _a.toString();
        if (!token) {
            throw new Error("no token in url query");
        }
        const result = yield UserController_1.UserController.verifyUser(token);
        return res.status(result.success ? 201 : 400).json(result);
    }
    catch (error) {
        console.error("User verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error verifying user"
        });
    }
});
const isVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.query.token) === null || _a === void 0 ? void 0 : _a.toString();
        if (!token) {
            throw new Error("No token provided");
        }
        const result = yield UserController_1.UserController.isVerified(token);
        return res.status((result.message === "User is verified." || result.message === "User is not verified.")
            ? 201 : 400).json(result);
    }
    catch (error) {
        console.log("Verification check error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error checking if user is verified"
        });
    }
});
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield UserController_1.UserController.signIn(email, password);
        return res.status(result.success ? 201 : 400).json(result);
    }
    catch (error) {
        console.log("User sign in error:", error);
        res.status(500).json({
            success: false,
            message: "Server error signing user in"
        });
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh } = req.body;
    if (!refresh) {
        return res.status(400).json({
            success: false,
            message: "no refresh token provided"
        });
    }
    try {
        const decoded = jwt.verify(refresh, process.env.JWT_SECRET);
        const newAccessToken = AuthService_1.AuthService.generateAccessToken(decoded.userId);
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `bad token format or token expired. ${error instanceof Error ? error.message : ''}`
        });
    }
});
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.substring(7);
        if (!token) {
            throw new Error("No token provided.");
        }
        const result = yield UserController_1.UserController.getUserData(token);
        const { success, message } = result, userData = __rest(result, ["success", "message"]);
        return res.status(result.success ? 201 : 400).json({
            success,
            message,
            userData: success ? userData : {}
        });
    }
    catch (error) {
        console.log("Error getting user data:", error);
        res.status(500).json({
            success: false,
            message: "Server error getting user data"
        });
    }
});
const addUserAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, isTemporary } = req.body;
        const result = yield UserController_1.UserController.addUserAddress(data, isTemporary);
        return res.status(result.success ? 201 : 400).json(result);
    }
    catch (error) {
        console.log("Error adding user address:", error);
        return res.status(500).json({
            success: false,
            message: "Server error adding user address"
        });
    }
});
const verifyPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.substring(7);
        if (!token) {
            throw new Error("No token found.");
        }
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }
        const result = yield UserController_1.UserController.verifyPassword(password, token);
        return res.status(result.success ? 201 : 400).json({ result });
    }
    catch (error) {
        console.log("Error verifying user password:", error);
        return res.status(500).json({
            success: false,
            message: "Server error verifying user password."
        });
    }
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.substring(7);
        if (!token) {
            throw new Error("No token found.");
        }
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }
        const result = yield UserController_1.UserController.changePassword(password, token);
        return res.status(result.success ? 201 : 400).json({ result });
    }
    catch (error) {
        console.log("Error changing user password:", error);
        return res.status(500).json({
            success: false,
            message: "Server error changing user password."
        });
    }
});
userRouter.post("/user/register", registerUser);
userRouter.post("/user/sign-in", signIn);
userRouter.post("/user/refresh-token", refreshToken);
userRouter.get("/user/verify-email", verifyUser);
userRouter.get("/user/is-verified", isVerified);
userRouter.get("/user/get-user-data", AuthMiddleware_1.authMiddleware, getUserData);
userRouter.post("/user/add-user-address", AuthMiddleware_1.authMiddleware, addUserAddress);
userRouter.post("/user/verify-password", AuthMiddleware_1.authMiddleware, verifyPassword);
userRouter.patch("/user/change-password", AuthMiddleware_1.authMiddleware, changePassword);
exports.default = userRouter;
