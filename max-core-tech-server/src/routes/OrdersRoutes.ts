import { Request, Response, Router } from "express";
import { OrdersController } from "../controllers/OrdersController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const ordersRouter = Router()

const addOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, addressId, items } = req.body
        if(!userId || !addressId || !items) {
            throw new Error("Missing fields.")
        }
        const result = await OrdersController.addOrder(userId, addressId, items)

        return res.status(result.success ? 201 : 400).json(result)
    } catch(error) {
        console.log("Error placing an order:", error)
        return {
            success: false,
            message: "Server error placing an order."
        }
    }
}

ordersRouter.post("/orders/add-order",
    authMiddleware,
    addOrder
)

export default ordersRouter