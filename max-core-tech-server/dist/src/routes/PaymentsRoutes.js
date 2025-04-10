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
const PaymentsController_1 = require("../controllers/PaymentsController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const paymentsRouter = (0, express_1.Router)();
const purchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        if (!items) {
            throw new Error("No items provided.");
        }
        const result = yield PaymentsController_1.PaymentsController.purchase(items);
        return res.status(result.success ? 201 : 400).json(result);
    }
    catch (error) {
        console.log("Error making a purchase:", error);
        return res.status(500).json({
            success: false,
            message: "Server error making a purchase."
        });
    }
});
paymentsRouter.post("/payments/purchase", AuthMiddleware_1.authMiddleware, purchase);
exports.default = paymentsRouter;
