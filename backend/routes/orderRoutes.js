import express from "express";

import {placeOrder,generateBill,dailySales} from "../controllers/orderController.js";

import {authMiddleware,adminMiddleware} from "../middleware/authmiddleware.js";

const router=express.Router();

router.post("/",authMiddleware,placeOrder);

router.get("/bill/:id",authMiddleware,generateBill);

router.get("/daily-sales",authMiddleware,adminMiddleware(["admin"]),dailySales);

export default router;