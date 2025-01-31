const express = require("express");

const adminSignup = require("../Controllers/Admin/adminSignup");
const adminSignin = require("../Controllers/Admin/adminSignin");

const router = express();


router.post("/signin", adminSignin)

router.post("/signup", adminSignup)

module.exports = router;