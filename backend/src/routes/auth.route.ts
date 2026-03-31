import express  from "express";
import { Login, Register } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/registe', Register);

router.post("/login", Login);

export  default router;