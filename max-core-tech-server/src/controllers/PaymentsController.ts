import Stripe from "stripe";
import { PaymentResponse } from "../types/ResponseTypes";
import { Item } from "../types/PurchaseTypes";

const stripe = new Stripe(process.env.STRIPE_SK!)

export class PaymentsController {
    static async purchase(items: Item[]): Promise<PaymentResponse> {
        try {
            if(items.length === 0) {
                throw new Error("No items provided.")
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
            }))

            const session = await stripe.checkout.sessions.create({
                line_items: purchaseData,
                mode: 'payment',
                success_url: 'http://localhost:3000/payment-successful',
                cancel_url: 'http://localhost:3000/'
            })

            return {
                success: true,
                message: "Payment session created successfully.",
                sessionId: session.id
            }
        } catch(error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Something went wrong creating a payment session."
            }
        }
    }
}