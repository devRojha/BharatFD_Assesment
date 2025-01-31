const {z} = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin } = require("../db");

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const signupType = z.object({
    Name : z.string().min(3),
    Email : z.string().email(),
    Password : z.string().min(3),
});



const adminSignup = async (req , res)=>{
    const {Name, Email, Password } = req.body;
    const zodPass = signupType.safeParse({Name, Email,Password});
    if(!zodPass.success ){
        res.status(409).json({"msg" : "Wrong Credential"})
        return;
    }
    try{
        const userFind = await Admin.findOne({Email});
        if(!userFind){
            const hasPassword = await bcrypt.hash(Password , 10);
            const newUser = await Admin.create({
                Name,
                Email,
                Password : hasPassword,
            });
            const payload = {userId : newUser._id};
            const Token = jwt.sign(payload , secretKey);
            res.status(200).json({Token});
            return;
        }
        else{
            res.status(409).json({"msg" : "user Allready Exist"})
        }
    }
    catch (e) {
        console.error("Signup failed with error:", e);
        res.status(500).json({ "msg": "Signup failed with error" });
        return;
    }
}

module.exports = adminSignup