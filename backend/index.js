const express = require("express");
const cors = require("cors");
const mainRouter = require("./Routes/index.js")
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api" , mainRouter);

const Port = 4000;
app.get("/", (req, res)=>{
    res.status(200).send(`Port is runnig on ${Port}`);
})

app.listen(Port, ()=> console.log(`backend is running on ${4000}`))