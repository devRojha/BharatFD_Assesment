const express = require("express");
const router = express();
const adminRoutes = require("./adminRoutes.js");
const faqRoutes = require("./faqRoutes.js");


router.use("/admin", adminRoutes)
router.use("/faq", faqRoutes)

module.exports = router;