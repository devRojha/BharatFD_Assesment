const express = require("express");

const adminSignup = require("../Controllers/adminSignup");
const adminSignin = require("../Controllers/adminSignin");

const router = express();


router.post("/signin", adminSignin)

router.post("/signup", adminSignup)

module.exports = router;