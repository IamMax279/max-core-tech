import { Product } from "@prisma/client";
import { RestResponse } from "../types/ResponseTypes";
import prisma from "../../prisma/PrismaClient";
import { Product as ProductData } from "../types/ProductTypes";

export class ProductController {
    static async createNewProduct(product: ProductData): Promise<RestResponse> {
        try {
            await prisma.product.create({
                data: {...product}
            })
            return {
                success: true,
                message: "Successfully added a new product."
            }
        } catch(error) {
            return {
                success: false,
                message: "Failed to add a new product."
            }
        }
    }
    static async getAllProducts(): Promise<Product[]> {
        return await prisma.product.findMany()
    }
}