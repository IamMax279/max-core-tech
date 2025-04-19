import { Request, Response, Router } from "express";
import { PaymentsController } from "../controllers/PaymentsController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const paymentsRouter = Router()

const purchase = async (req: Request, res: Response): Promise<any> => {
    try {
        const { items } = req.body
        if(!items) {
            throw new Error("No items provided.")
        }

        const result = await PaymentsController.purchase(items)
        return res.status(result.success ? 201 : 400).json(result)
    } catch(error) {
        return res.status(500).json(
            {
                success: false,
                message: "Server error making a purchase."
            }
        )
    }
}

paymentsRouter.post("/payments/purchase",
    authMiddleware,
    purchase
)

export default paymentsRouter