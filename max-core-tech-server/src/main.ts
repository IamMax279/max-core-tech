import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/UserRoutes"
import productRouter from "./routes/ProductRoutes"
import authRouter from "./routes/AuthRoutes"
import paymentsRouter from "./routes/PaymentsRoutes"
import ordersRouter from "./routes/OrdersRoutes"

const app = express()
dotenv.config()

app.use(cors({
    origin: ["http://client:3000"],
    credentials: true
}))
app.use(express.json())

app.use(userRouter)
app.use(productRouter)
app.use(authRouter)
app.use(paymentsRouter)
app.use(ordersRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT)