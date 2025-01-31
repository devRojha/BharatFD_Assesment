const translateText = require("../Language/lagnTranslate");




const getAllFAQ = async (req, res)=>{
    const text = "You are a good boy"
    const nexText = await translateText(text, "bn");
    console.log(nexText);
    res.status(200).send("All FAQ");
}

module.exports = getAllFAQ