import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../../DB/index.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const signinType = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const adminSignin = async (req, res) => {
  const { email, password } = req.body;
  const zodPass = signinType.safeParse({ email, password });
  
  if (!zodPass.success) {
    return res.status(409).json({ msg: "Wrong credentials" });
  }

  try {
    const userFind = await Admin.findOne({ email });
    
    if (!userFind) {
      return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, userFind.password);
    
    if (passwordMatch) {
      const payload = { userId: userFind._id };
      const token = jwt.sign(payload, secretKey);
      return res.status(200).json({ token });
    } else {
      return res.status(409).json({ msg: "Wrong password" });
    }
  } catch (e) {
    console.error("Signin failed with error:", e);
    return res.status(500).json({ msg: "Signin failed with error" });
  }
};

export default adminSignin;
