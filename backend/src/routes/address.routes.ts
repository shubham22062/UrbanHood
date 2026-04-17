import express from "express";

import { addAddress, getAddress, updateAddress,deleteAddress, setDefaultAddress } from "../controllers/address.controllers.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router()


router.post("/", protect, addAddress);
router.get("/", protect,getAddress);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);
router.put("/default/:id", protect, setDefaultAddress);

export default router;