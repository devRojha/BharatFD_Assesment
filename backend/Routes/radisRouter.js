import express from "express";
import deleteAll from "../Controllers/Redis/deleteAll.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.delete("/clear", authMiddleware, deleteAll);

export default router;
