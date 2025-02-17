import { FAQ } from "../../DB/index.js";
import translateText from "../Language/langTranslate.js";

import redis from "../Redis/connect.js";

const getAllFAQ = async (req, res) => {
    try {
        const language = req.query.lang || "en"; // Default to English if no language specified

        // Check Redis cache for pre-translated FAQs
        const cachedData = await redis.get(`faqs:${language}`);
        if (cachedData) {
            return res.json(JSON.parse(cachedData)); // Return cached response if available
        }

        // Fetch FAQs from database if not in cache
        const faqs = await FAQ.find(); 
        const translatedFaqs = await Promise.all(
            faqs.map(async (faq) => ({
                question: await translateText(faq.question, language),
                answer: await translateText(faq.answer, language),
            }))
        );
        
        // Cache the translated FAQs in Redis for 1 hour (3600 seconds)
        await redis.setex(`faqs:${language}`, 3600, JSON.stringify(translatedFaqs));
    
        res.json(translatedFaqs);
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default getAllFAQ;
