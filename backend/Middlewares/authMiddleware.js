const jwt = require("jsonwebtoken");
const { Admin } = require("../db");

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next)=>{
    const token = req.headers.token;
    
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey);
    } catch (err) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }

    try {
        const _id = decoded.userId;

        // Validate the extracted userId
        if (!_id) {
            return res.status(400).json({ msg: "Invalid user data in token" });
        }

        const userFound = await Admin.findOne({ _id }).select("-Password");
        if (!userFound) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Attach user information to the request for further use in other routes
        req.authorID = userFound._id;
        next(); // Pass control to the next middleware or route handler
    } catch (e) {
        console.error("Error while getting user details: ", e);
        return res.status(500).json({ msg: "Error while getting user details" });
    }
}

module.exports = authMiddleware