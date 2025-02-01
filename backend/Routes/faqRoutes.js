import express from "express";
import getAllFAQ from "../Controllers/FAQ/getAllFAQ.js";
import creatFAQ from "../Controllers/FAQ/creatFAQ.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import updateFAQ from "../Controllers/FAQ/updateFAQ.js";
import deleteFAQ from "../Controllers/FAQ/deleteFAQ.js";
import deleteAllFAQ from "../Controllers/FAQ/deleteAllFAQ.js";

const router = express.Router(); // Use express.Router() for routing

router.get("/all", getAllFAQ);
router.post("/create", authMiddleware, creatFAQ);
router.post("/update", authMiddleware, updateFAQ);
router.post("/delete", authMiddleware, deleteFAQ);
router.post("/alldelete", authMiddleware, deleteAllFAQ);

export default router;
