const express = require("express");
const getAllFAQ = require("../Controllers/getAllFAQ");
const creatFAQ = require("../Controllers/creatFAQ");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express();


router.get("/all", getAllFAQ)

router.post("/create",authMiddleware, creatFAQ)

module.exports = router;