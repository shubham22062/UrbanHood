import express from "express";

import { placeOrder,getMyOrder,getAllOrders,updateOrderStatus } from "../controllers/order.controllers.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/", protect,placeOrder);
router.get("/my", protect, getMyOrder);

//adminOnly..

router.get("/", protect,adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly,updateOrderStatus)

export default router;