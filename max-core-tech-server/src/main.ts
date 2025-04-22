import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import rateLimit from "express-rate-limit"
import userRouter from "./routes/UserRoutes"
import productRouter from "./routes/ProductRoutes"
import authRouter from "./routes/AuthRoutes"
import paymentsRouter from "./routes/PaymentsRoutes"
import ordersRouter from "./routes/OrdersRoutes"

const app = express()
dotenv.config()

// const limiter = rateLimit({
//     windowMs: 1000 * 60 * 15,
//     limit: 100,
//     message: "Too many requests, try again later.",
//     standardHeaders: true,
//     legacyHeaders: false
// })
// app.use(limiter)

app.use(cors({
    origin: process.env.CLIENT_URL,
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