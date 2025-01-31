const translate = require("google-translate-api-x");

const translateText = async (text, lang) => {
  if (lang === "en") return text;

  console.log(`Translating to: ${lang}`);
  
  try {
    const { text: translatedText } = await translate(text, { to: lang });
    return translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Returning original text in case of an error
  }
};

module.exports = translateText;
