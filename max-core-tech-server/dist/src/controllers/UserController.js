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
exports.UserController = void 0;
const PrismaClient_1 = __importDefault(require("../../prisma/PrismaClient"));
const argon2 = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
const AuthService_1 = require("../services/AuthService");
class UserController {
    static registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userData.email.trim() || !userData.firstName.trim() || !userData.lastName.trim() || !userData.password.trim()) {
                return {
                    success: false,
                    message: "Some field(s) are empty"
                };
            }
            try {
                const hashedPassword = yield argon2.hash(userData.password);
                const user = yield PrismaClient_1.default.user.create({
                    data: Object.assign(Object.assign({}, userData), { password: hashedPassword })
                });
                const token = AuthService_1.AuthService.generateAccessToken(user.id.toString());
                const res = yield AuthService_1.AuthService.sendVerificationEmail(user.email, token);
                if (!res.success) {
                    return {
                        success: false,
                        message: "Failed to send verification email"
                    };
                }
                return {
                    success: true,
                    message: "User added successfully + verification email sent."
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Error adding a user to the db."
                };
            }
        });
    }
    static verifyUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            try {
                yield PrismaClient_1.default.user.update({
                    where: { id: BigInt(decoded.userId) },
                    data: { verified: true }
                });
                return {
                    success: true,
                    message: "user verified successfully"
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "error verifying token"
                };
            }
        });
    }
    static isVerified(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            try {
                const userId = decoded.userId;
                const user = yield PrismaClient_1.default.user.findFirst({
                    where: { id: BigInt(userId) }
                });
                if (!user) {
                    throw new Error("User not found.");
                }
                if (!user.verified) {
                    return {
                        success: false,
                        message: "User is not verified."
                    };
                }
                else {
                    return {
                        success: true,
                        message: "User is verified."
                    };
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "error checking if user is verified"
                };
            }
        });
    }
    static signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email.trim() || !password.trim()) {
                return {
                    success: false,
                    message: "Some field(s) are empty."
                };
            }
            const user = yield PrismaClient_1.default.user.findFirst({
                where: { email: email }
            });
            if (!user) {
                return {
                    success: false,
                    message: "This user does not exist."
                };
            }
            if (!user.verified) {
                return {
                    success: false,
                    message: "user not verified"
                };
            }
            const correctPassword = yield argon2.verify(user.password, password);
            if (!correctPassword) {
                return {
                    success: false,
                    message: "Incorrect password."
                };
            }
            const token = AuthService_1.AuthService.generateAccessToken(user.id.toString());
            const refresh = AuthService_1.AuthService.generateRefreshToken(user.id.toString());
            return {
                success: true,
                message: "Signed in successfully.",
                jwt: token,
                refresh: refresh
            };
        });
    }
    static getUserData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = yield PrismaClient_1.default.user.findFirst({
                    where: { id: decoded.userId }
                });
                if (!user) {
                    return {
                        success: false,
                        message: "This user does not exist."
                    };
                }
                const userAddress = yield PrismaClient_1.default.userAddresses.findFirst({
                    where: { userId: user.id }
                });
                if (!userAddress) {
                    return {
                        success: true,
                        message: "Only substantial data found.",
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    };
                }
                const { id, createdAt, updatedAt, userId } = userAddress, data = __rest(userAddress, ["id", "createdAt", "updatedAt", "userId"]);
                if (userAddress === null || userAddress === void 0 ? void 0 : userAddress.isTemporary) {
                    return {
                        success: true,
                        message: "Data found successfully.",
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        addressId: id.toString()
                    };
                }
                return {
                    success: true,
                    message: "Data found successfully.",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    addressId: id.toString(),
                    userAddress: Object.assign(Object.assign({}, data), { userId: userId.toString() })
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "error finding user"
                };
            }
        });
    }
    static addUserAddress(data, isTemporary) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.apt.trim() || !data.city.trim() || !data.phone.trim() || !data.street.trim() || !data.unit.trim() || !data.zipCode.trim() || !data.userId.trim()) {
                return {
                    success: false,
                    message: "Each field must be filled."
                };
            }
            try {
                const userAddress = yield PrismaClient_1.default.userAddresses.findFirst({
                    where: { userId: BigInt(data.userId) }
                });
                if (userAddress) {
                    const { userId } = data, toUpdate = __rest(data, ["userId"]);
                    yield PrismaClient_1.default.userAddresses.update({
                        where: { userId: BigInt(data.userId) },
                        data: Object.assign({}, toUpdate)
                    });
                    return {
                        success: true,
                        message: "Updated user address successfully."
                    };
                }
                yield PrismaClient_1.default.userAddresses.create({
                    data: Object.assign(Object.assign({}, data), { userId: BigInt(data.userId), isTemporary: isTemporary })
                });
                return {
                    success: true,
                    message: "Added new user address successfully."
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "error adding a new address"
                };
            }
        });
    }
    static verifyPassword(password, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const userId = decoded.userId;
                const user = yield PrismaClient_1.default.user.findFirst({
                    where: { id: BigInt(userId) }
                });
                if (!user) {
                    return {
                        success: false,
                        message: "User not found."
                    };
                }
                const isCorrect = yield argon2.verify(user.password, password);
                if (isCorrect) {
                    const t = AuthService_1.AuthService.generateShortLiveToken(user.id.toString());
                    return {
                        success: true,
                        message: "Correct password.",
                        token: t
                    };
                }
                else {
                    throw new Error("Incorrect password");
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Error verifying password."
                };
            }
        });
    }
    static changePassword(password, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const userId = decoded.userId;
                const user = yield PrismaClient_1.default.user.findFirst({
                    where: { id: BigInt(userId) }
                });
                if (!user) {
                    return {
                        success: false,
                        message: "User not found."
                    };
                }
                yield PrismaClient_1.default.user.update({
                    where: { id: userId },
                    data: { password: yield argon2.hash(password) }
                });
                return {
                    success: true,
                    message: "Password changed successfully"
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Error changing password."
                };
            }
        });
    }
    static sendPasswordChangeLink(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const id = BigInt(decoded.userId);
                const user = yield PrismaClient_1.default.user.findFirst({
                    where: { id: id }
                });
                if (!user) {
                    throw new Error("This user does not exist.");
                }
                const res = yield AuthService_1.AuthService.sendPasswordChangeEmail(token);
                const t = AuthService_1.AuthService.generateShortLiveToken(user.id.toString());
                if (res.success) {
                    return {
                        success: true,
                        message: res.message,
                        token: t
                    };
                }
                else {
                    throw new Error(res.message);
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Error sending password change email."
                };
            }
        });
    }
}
exports.UserController = UserController;
