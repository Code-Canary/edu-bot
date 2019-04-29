let Question = require('../models/question').Question;

const questions = [
    new Question({
        title: "blablablbla?",
        type: "free_text",
        rendered_image_path: "",
        branches: [{
            answer: "<div></div>",
            next_question: null,
        }]
    })
];

module.exports = questions;
