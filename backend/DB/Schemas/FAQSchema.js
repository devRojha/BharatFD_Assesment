const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true,
    },
    authorID: {
        type: String,
        required: true
    }
});

module.exports = FAQSchema;
