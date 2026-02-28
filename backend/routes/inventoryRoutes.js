import express from "express";
import {addInventory,getInventory,updateInventory} from "../controllers/inventoryController.js";
import {authMiddleware,adminMiddleware} from "../middleware/authmiddleware.js";

const router=express.Router();

router.post("/",authMiddleware,adminMiddleware(["admin"]),addInventory);

router.put("/:id" ,authMiddleware,adminMiddleware(["admin"]),updateInventory);

router.get("/",authMiddleware,adminMiddleware(["admin"]),getInventory);

export default router;
