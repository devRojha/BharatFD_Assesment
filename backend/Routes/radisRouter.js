const express = require("express");
const deleteAll = require("../Controllers/Redis/deleteAll");
const authMiddleware = require("../Middlewares/authMiddleware");


const router = express();


router.delete("/delete/allcaches",authMiddleware, deleteAll)


module.exports = router;