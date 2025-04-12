import prisma from "./PrismaClient";

interface Product {
    name: string,
    price: number
}

const loadProducts = async () => {
    try {
        const products: Product[] = [
            {
                name: "imac-24",
                price: 1499.99
            },
            {
                name: "titanview-xg",
                price: 499.99
            },
            {
                name: "cyberview-pro",
                price: 599.99
            },
            {
                name: "visionedge-34",
                price: 499.99
            },
            {
                name: "titanboard-x99",
                price: 299.99
            },
            {
                name: "thundervolt-elite",
                price: 149.99
            },
            {
                name: "novaforce-x80",
                price: 399.99
            },
            {
                name: "thunderstrike-pro",
                price: 59.99
            },
            {
                name: "apexsonic-x",
                price: 199.99
            },
            {
                name: "keytech-2000",
                price: 89.99
            },
        ]

        for(const product of products) {
            await prisma.product.upsert({
                where: {name: product.name},
                update: product,
                create: product
            })
        }
    } catch(error) {
        console.log("Error adding products:", error)
    }
}

loadProducts()