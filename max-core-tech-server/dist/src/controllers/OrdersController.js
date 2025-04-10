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
exports.OrdersController = void 0;
const PrismaClient_1 = __importDefault(require("../../prisma/PrismaClient"));
class OrdersController {
    static addOrder(userId, addressId, items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Just hit the order:", userId, addressId, items);
                const orderItemPromises = items.map((item) => __awaiter(this, void 0, void 0, function* () {
                    return ({
                        productId: yield this.findByName(item.id),
                        quantity: item.quantity,
                        unitPrice: item.price
                    });
                }));
                const orderItems = yield Promise.all(orderItemPromises);
                const order = yield PrismaClient_1.default.order.create({
                    data: {
                        userId: BigInt(userId),
                        addressId: BigInt(addressId),
                        //quantity: items.reduce((total, item) => total += item.quantity, 0),
                        status: "pending",
                        items: {
                            create: orderItems.map((item) => ({
                                productId: BigInt(item.productId),
                                quantity: item.quantity,
                                unitPrice: item.unitPrice
                            }))
                        }
                    },
                    include: {
                        items: true,
                        user: true,
                        address: true
                    }
                });
                // const address = await prisma.userAddresses.findFirst({
                //     where: {id: BigInt(addressId)}
                // })
                // if(address && address.isTemporary) {
                //     await prisma.userAddresses.delete({
                //         where: {id: address.id}
                //     })
                // }
                return {
                    success: true,
                    message: "Order placed successfully"
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Error placing an order."
                };
            }
        });
    }
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield PrismaClient_1.default.product.findFirst({
                where: { name: name }
            });
            if (!product) {
                return null;
            }
            return product.id;
        });
    }
}
exports.OrdersController = OrdersController;
