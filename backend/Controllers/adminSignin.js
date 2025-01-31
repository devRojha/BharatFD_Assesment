const {z} = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin } = require("../db");

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const signinType = z.object({
    Email : z.string().email(),
    Password : z.string().min(3),
});



const adminSignin = async (req , res)=>{
    const {Email, Password} = req.body;
    const zodPass = signinType.safeParse({Email, Password});
    if(!zodPass.success){
        res.status(409).json({"msg" : "Wrong Credential"})
        return;
    }
    try{
        const userFind = await Admin.findOne({Email});
        if(!userFind){
            res.status(404).json({"msg" : "User not found"});
            return ;
        }
        const passwordMatch = await bcrypt.compare(Password, userFind.Password);
        if(passwordMatch){
            const payload = {userId : userFind._id};
            const Token = jwt.sign(payload , secretKey);
            res.status(200).json({Token});
        }
        else{
            res.status(409).json({"msg" : "Wrong Password"});
        }
    }
    catch (e) {
        console.error("Signin failed with error:", e);
        res.status(500).json({ "msg": "Signin failed with error" });
    }
}


module.exports = adminSignin