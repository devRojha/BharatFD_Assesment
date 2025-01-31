const express = require("express");
const router = express();
const adminRoutes = require("./adminRoutes.js");
const faqRoutes = require("./faqRoutes.js");
const radisRouter = require("./radisRouter.js");


router.use("/admin", adminRoutes)

router.use("/faq", faqRoutes)

router.use("/radis", radisRouter)


module.exports = router;