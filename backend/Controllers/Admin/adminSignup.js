const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin } = require("../../DB");


require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const signupType = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
});

const adminSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const zodPass = signupType.safeParse({ name, email, password });
  
  if (!zodPass.success) {
    return res.status(409).json({ msg: "Wrong credentials" });
  }

  try {
    const userFind = await Admin.findOne({ email });
    
    if (!userFind) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Admin.create({
        name,
        email,
        password: hashedPassword,
      });
      
      const payload = { userId: newUser._id };
      const token = jwt.sign(payload, secretKey);
      
      return res.status(200).json({ token });
    } else {
      return res.status(409).json({ msg: "User already exists" });
    }
  } catch (e) {
    console.error("Signup failed with error:", e);
    return res.status(500).json({ msg: "Signup failed with error" });
  }
};

module.exports = adminSignup;
