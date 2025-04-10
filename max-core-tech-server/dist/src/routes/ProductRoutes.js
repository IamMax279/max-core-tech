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
const ProductController_1 = require("../controllers/ProductController");
const AdminMiddleware_1 = require("../middleware/AdminMiddleware");
const productRouter = (0, express_1.Router)();
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        const result = yield ProductController_1.ProductController.createNewProduct({ name, price });
        return res.status(result.success ? 201 : 400).json(result);
    }
    catch (error) {
        console.log("Error adding new product:", error);
        return res.status(500).json({
            success: false,
            message: "Server error adding product"
        });
    }
});
productRouter.post('/product/add-product', AdminMiddleware_1.adminMiddleware, addNewProduct);
exports.default = productRouter;
