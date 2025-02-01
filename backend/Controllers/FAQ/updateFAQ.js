
const { FAQ } = require("../../DB");
const translateText = require("../Language/langTranslate");

const updateFAQ = async (req, res) => {
  const { id, question, answer } = req.body;
  let englishQuestion
  let englishAnswer
  if(question){
      englishQuestion = await translateText(question, "en");
  }
  if(answer){
      englishAnswer = await translateText(answer, "en");
  }

  try {
    const faqAllReadeExist = await FAQ.findById(id);
    if(!faqAllReadeExist){
        return res.status(400).json({msg : "FAQ Not Exist"});
    }
    if(question){
        faqAllReadeExist.question =  englishQuestion ;
    }
    if(answer){
        faqAllReadeExist.answer =  englishAnswer ;
    }
    await FAQ.updateOne({_id : id},{
      question: faqAllReadeExist.question,
      answer: faqAllReadeExist.answer,
      authorID: req.authorID,
    });

    return res.status(200).json({ msg: "FAQ updated" });
  } catch (error) {
    console.error(`Updating FAQ failed with error: ${error}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = updateFAQ;
