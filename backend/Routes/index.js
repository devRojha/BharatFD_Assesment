import express from "express";
import adminRoutes from "./adminRoutes.js";
import faqRoutes from "./faqRoutes.js";
import radisRouter from "./radisRouter.js";

const router = express.Router();

router.use("/admin", adminRoutes)

router.use("/faq", faqRoutes)

router.use("/radis", radisRouter)


export default router;