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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SK);
class PaymentsController {
    static purchase(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (items.length === 0) {
                    throw new Error("No items provided.");
                }
                const purchaseData = items.map((item) => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price * 100 //price in cents
                    },
                    quantity: item.quantity
                }));
                const session = yield stripe.checkout.sessions.create({
                    line_items: purchaseData,
                    mode: 'payment',
                    success_url: 'http://localhost:3000/payment-successful',
                    cancel_url: 'http://localhost:3000/'
                });
                return {
                    success: true,
                    message: "Payment session created successfully.",
                    sessionId: session.id
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Something went wrong creating a payment session."
                };
            }
        });
    }
}
exports.PaymentsController = PaymentsController;
