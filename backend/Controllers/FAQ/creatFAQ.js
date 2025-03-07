import { FAQ } from "../../DB/index.js";
import translateText from "../Language/langTranslate.js";


const createFAQ = async (req, res) => {
  const { question, answer } = req.body;
  const englishQuestion = await translateText(question, "en");
  const englishAnswer = await translateText(answer, "en");

  try {
    const faqAllReadeExist = await FAQ.find({ question: englishQuestion });
    if (faqAllReadeExist.length > 0) {
      return res.status(404).json({ msg: "FAQ already exists" });
    }
    await FAQ.create({
      question: englishQuestion,
      answer: englishAnswer,
      authorID: req.authorID,
    });

    return res.status(200).json({ msg: "FAQ added" });
  } catch (error) {
    console.error(`Creating FAQ failed with error: ${error}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export default createFAQ;
