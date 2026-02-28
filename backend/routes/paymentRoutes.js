import express from 'express';

import {fakepayment} from "../controllers/paymentController.js";
import { authMiddleware } from '../middleware/authmiddleware.js';
const router=express.Router();

router.post("/pay",authMiddleware,fakepayment);

export default router;