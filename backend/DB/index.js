const mongoose = require("mongoose");
const AdminSchema = require("./Schemas/AdminSchema")
const FAQSchema = require("./Schemas/FAQSchema")


require('dotenv').config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
.then(()=>{
    console.log('Connected to MongoDB');
}).catch(()=>{
    console.error('Connection error', err);
})

const Admin = mongoose.model('Admin', AdminSchema);
const FAQ = mongoose.model('FAQ', FAQSchema);

module.exports = {Admin, FAQ};