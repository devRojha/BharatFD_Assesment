const mongoose = require("mongoose");

const AdminSchema = require("./Schemas/AdminSchema");
const FAQSchema = require("./Schemas/FAQSchema");

require("dotenv").config();

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

module.exports = { Admin, FAQ };
