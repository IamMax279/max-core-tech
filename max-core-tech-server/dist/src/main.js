"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const PaymentsRoutes_1 = __importDefault(require("./routes/PaymentsRoutes"));
const OrdersRoutes_1 = __importDefault(require("./routes/OrdersRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express_1.default.json());
app.use(UserRoutes_1.default);
app.use(ProductRoutes_1.default);
app.use(AuthRoutes_1.default);
app.use(PaymentsRoutes_1.default);
app.use(OrdersRoutes_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server running on port", PORT);
});
