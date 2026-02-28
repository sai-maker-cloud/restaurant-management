import express from "express";

import {addmenu,getmenu,deletemenu} from "../controllers/menuController.js";

import { authMiddleware,adminMiddelware } from "../middleware/authmiddleware.js";
const router=express.Router();

router.post("/add",authMiddleware,adminMiddelware(["admin"]),addmenu);

router.delete("/:id",authMiddleware,adminMiddelware(["admin"]),deletemenu);

router.get("/" ,authMiddleware,getmenu);

export default router;
