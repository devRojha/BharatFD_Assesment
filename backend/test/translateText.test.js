import chai from 'chai'; 
import sinon from 'sinon'; 
import translate from 'google-translate-api-x'; 
import translateText from '../Controllers/Language/langTranslate.js'; 

const { expect } = chai; // Destructure expect from chai

describe('translateText', function () {
  afterEach(() => {
    sinon.restore(); // Restore any stubbed/mocked functions after each test
  });

  it("should return the same text when language is 'en'", async function () {
    const text = "Hello, world!";
    const lang = "en";
    const result = await translateText(text, lang);
    expect(result).to.equal(text); // Use expect for assertions
  });

  it("should return translated text when language is not 'en'", async function () {
    const text = "Hello, world";
    const lang = "hi";
    
    // Mocking the translate function
    const mockTranslatedText = "हैलो वर्ल्ड";
    sinon.stub(translate, "translate").resolves({ text: mockTranslatedText });

    const result = await translateText(text, lang);
    expect(result).to.equal(mockTranslatedText); // Use expect for assertions
  });

  it("should return translated text when language is not 'en'", async function () {
    const text = "How are you";
    const lang = "sa";
    
    // Mocking the translate function
    const mockTranslatedText = "भवान्‌ कथमसि";
    sinon.stub(translate, "translate").resolves({ text: mockTranslatedText });

    const result = await translateText(text, lang);
    expect(result).to.equal(mockTranslatedText); // Use expect for assertions
  });

  it("should return original text if translation fails", async function () {
    const text = "Hello, world";
    const lang = "abc";

    // Simulating a translation error
    sinon.stub(translate, "translate").rejects(new Error("Translation error"));

    const result = await translateText(text, lang);
    expect(result).to.equal(text); // Use expect for assertions
  });
});
