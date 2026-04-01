import express from "express";
import { createProduct,getProducts,getProductById,updateProduct,deleteProduct } from "../controllers/product.controllers.js";

import { protect,adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

//public Routes..

router.get("/", getProducts);
router.get("/:id", getProductById);

//admin routes ..

router.post("/", protect, adminOnly, createProduct);

router.put("/:id" , protect , adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;