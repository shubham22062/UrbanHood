import express, { Router } from "express";

import { addToCart,removeCartItem,getCart,updateCartItem } from "../controllers/cart.controllers.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect,addToCart);

router.get("/",protect,getCart);

router.put("/", protect,updateCartItem);

router.delete("/:productId", protect,removeCartItem)

export default router;