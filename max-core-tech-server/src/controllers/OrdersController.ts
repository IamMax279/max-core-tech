import prisma from "../../prisma/PrismaClient";
import { Item } from "../types/PurchaseTypes";
import { RestResponse } from "../types/ResponseTypes";


export class OrdersController {
    static async addOrder(userId: string, addressId: string, items: Item[]): Promise<RestResponse> {
        try {
            console.log("Just hit the order:", userId, addressId, items)

            const orderItemPromises = items.map(async (item) => ({
                productId: await this.findByName(item.id),
                quantity: item.quantity,
                unitPrice: item.price
            }))

            const orderItems = await Promise.all(orderItemPromises)

            const order = await prisma.order.create({
                data: {
                    userId: BigInt(userId),
                    addressId: BigInt(addressId),
                    //quantity: items.reduce((total, item) => total += item.quantity, 0),
                    status: "pending",
                    items: {
                        create: orderItems.map((item) => ({
                            productId: BigInt(item.productId as any),
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
            })

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
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error placing an order."
            }
        }
    }

    private static async findByName(name: string): Promise<BigInt | null> {
        const product = await prisma.product.findFirst({
            where: {name: name}
        })

        if(!product) {
            return null
        }

        return product.id
    }
}