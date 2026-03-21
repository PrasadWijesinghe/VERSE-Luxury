import { Router } from "express";
import { authRequired } from "../middleware/authRequired";
import { placeOrder, getMyOrders } from "../controllers/orderController";

const router = Router();

// POST /api/orders — place a new order
router.post("/", authRequired, placeOrder);

// GET /api/orders/mine — list the current user's orders
router.get("/mine", authRequired, getMyOrders);

export default router;
