const jwt = require("jsonwebtoken");
const { Admin } = require("../db");

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next)=>{
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ msg: "No token provided" });
        return;
    }
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey);
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
        return;
    }
    try {
        const _id = decoded.userId;
        const userFound = await Admin.findOne({ _id  }).select("-Password");
        if (!userFound) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        // Attach user information to request for further use in other routes if needed
        req.authorID = userFound._id;
        next(); // Pass control to the next middleware or route handler
    } catch (e) {
        console.log("Error while getting user details: " + e);
        return res.status(500).json({ msg: "Error while getting user details" });
    }
}

module.exports = authMiddleware