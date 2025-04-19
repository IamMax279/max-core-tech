import { Request, Response, Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { adminMiddleware } from "../middleware/AdminMiddleware";

const productRouter = Router()

const addNewProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, price } = req.body
        const result = await ProductController.createNewProduct({name, price})
        return res.status(result.success ? 201 : 400).json(result)
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error adding product"
        })
    }
}

productRouter.post('/product/add-product',
    adminMiddleware,
    addNewProduct
)

export default productRouter