import translate from "google-translate-api-x";


const translateText = async (text, lang) => {
  if (lang === "en") return text;
  
  try {
    const { text: translatedText } = await translate(text, { to: lang });
    return translatedText;
  } catch (error) {
    // console.error("Translation error:", error);
    return text; // Returning original text in case of an error
  }
};

export default translateText;
