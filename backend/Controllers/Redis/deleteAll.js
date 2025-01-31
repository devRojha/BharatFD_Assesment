
const redis = require("./connect");




const deleteAll = async(req , res)=>{
    try{
        await redis.flushall();
        res.status(200).json({ msg : "Caches are deleted"})
    }
    catch(e){
        console.log(`Caches deleting faild with Error : ${e}`);
        res.status(500).json({ msg : "Internal Server Down" });
    }
}

module.exports = deleteAll