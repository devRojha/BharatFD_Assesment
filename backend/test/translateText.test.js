const { expect } = require("chai");
const sinon = require("sinon");
const translate = require("google-translate-api-x");
const translateText = require("../Controllers/Language/langTranslate");

describe("translateText", function () {
  afterEach(() => {
    sinon.restore(); // Restore any stubbed/mocked functions after each test
  });

  it("should return the same text when language is 'en'", async function () {
    const text = "Hello, world!";
    const lang = "en";
    const result = await translateText(text, lang);
    expect(result).to.equal(text); // Should return the original text
  });

  it("should return translated text when language is not 'en'", async function () {
    const text = "Hello, world";
    const lang = "hi";
    
    // Mocking the translate function
    const mockTranslatedText = "हैलो वर्ल्ड";
    sinon.stub(translate, "default").resolves({ text: mockTranslatedText });

    const result = await translateText(text, lang);
    expect(result).to.equal(mockTranslatedText); // Should return translated text
  });

  it("should return original text if translation fails", async function () {
    const text = "Hello, world";
    const lang = "abc";

    // Simulating a translation error
    sinon.stub(translate, "default").rejects(new Error("Translation error"));

    const result = await translateText(text, lang);
    expect(result).to.equal(text); // Should return the original text in case of an error
  });
});
