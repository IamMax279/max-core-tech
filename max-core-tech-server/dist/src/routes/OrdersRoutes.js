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
const OrdersController_1 = require("../controllers/OrdersController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const ordersRouter = (0, express_1.Router)();
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, addressId, items } = req.body;
        if (!userId || !addressId || !items) {
            throw new Error("Missing fields.");
        }
        const result = yield OrdersController_1.OrdersController.addOrder(userId, addressId, items);
        return res.status(result.success ? 201 : 400).json(result);
    }
    catch (error) {
        console.log("Error placing an order:", error);
        return {
            success: false,
            message: "Server error placing an order."
        };
    }
});
ordersRouter.post("/orders/add-order", AuthMiddleware_1.authMiddleware, addOrder);
exports.default = ordersRouter;
