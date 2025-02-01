import express from "express";
import cors from "cors";
import mainRouter from "./Routes/index.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api" , mainRouter);

const port = 8000;
app.get("/", (req, res)=>{
    res.status(200).send(`Port is runnig on ${port}`);
})

app.listen(port, ()=> console.log(`backend is running on ${port}`))