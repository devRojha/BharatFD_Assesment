import { FAQ } from "../../DB/index.js";
import translateText from "../Language/langTranslate.js";


const updateFAQ = async (req, res) => {
  const { id, question, answer } = req.body;
  let englishQuestion;
  let englishAnswer;

  if (question) {
    englishQuestion = await translateText(question, "en");
  }
  if (answer) {
    englishAnswer = await translateText(answer, "en");
  }

  try {
    const faqExist = await FAQ.findById(id);
    if (!faqExist) {
      return res.status(400).json({ msg: "FAQ does not exist" });
    }

    if (question) {
      faqExist.question = englishQuestion;
    }
    if (answer) {
      faqExist.answer = englishAnswer;
    }

    await FAQ.updateOne({ _id: id }, {
      question: faqExist.question,
      answer: faqExist.answer,
      authorID: req.authorID,
    });

    return res.status(200).json({ msg: "FAQ updated" });
  } catch (error) {
    console.error(`Updating FAQ failed with error: ${error}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export default updateFAQ;
