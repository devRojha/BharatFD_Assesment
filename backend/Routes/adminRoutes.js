import express from "express";
import adminSignup from "../Controllers/Admin/adminSignup.js";
import adminSignin from "../Controllers/Admin/adminSignin.js";

const router = express.Router(); // Use express.Router() for routing

router.post("/signin", adminSignin);
router.post("/signup", adminSignup);

export default router;
