import express from "express";
import userControllers from "../controllers/user.controller.js";
const router = express.Router();

router.get("/test", userControllers.test);

export default router;
