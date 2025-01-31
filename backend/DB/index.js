const mongoose = require("mongoose");
const adminSchema = require("./Schemas/AdminSchema");
const faqSchema = require("./Schemas/FAQSchema");

require("dotenv").config();

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

const Admin = mongoose.model("Admin", adminSchema);
const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = { Admin, FAQ };
