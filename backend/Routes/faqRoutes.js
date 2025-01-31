const express = require("express");
const getAllFAQ = require("../Controllers/FAQ/getAllFAQ");
const creatFAQ = require("../Controllers/FAQ/creatFAQ");
const authMiddleware = require("../Middlewares/authMiddleware");
const updateFAQ = require("../Controllers/FAQ/updateFAQ");
const deleteFAQ = require("../Controllers/FAQ/deleteFAQ");
const deleteAllFAQ = require("../Controllers/FAQ/deleteAllFAQ");

const router = express();


router.get("/all", getAllFAQ)

router.post("/create",authMiddleware, creatFAQ)

router.post("/update",authMiddleware, updateFAQ)

router.post("/delete",authMiddleware, deleteFAQ)

router.post("/alldelete",authMiddleware, deleteAllFAQ)

module.exports = router;