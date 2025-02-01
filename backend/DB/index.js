import mongoose from "mongoose";
import AdminSchema from "./Schemas/AdminSchema.js";
import FAQSchema from "./Schemas/FAQSchema.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

const Admin = mongoose.model("Admin", AdminSchema);
const FAQ = mongoose.model("FAQ", FAQSchema);

export { Admin, FAQ }; // Export Admin and FAQ models
