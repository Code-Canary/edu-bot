let Question = require('../models/question').Question;

const questions = [
    new Question({
        title: "How do you write a div?",
        type: "free_text",
        rendered_image_path: "",
        branches: [{
            answer: "<div></div>",
            next_question: null,
        }]
    }),
    new Question({
        title: "Would you like to create a website for that?",
        type: "free_text",
        rendered_image_path: "",
        branches: [{
            answer: "yes",
            next_question: null,
        },
        {
            answer: "no",
            next_question: null,
        }]
    }),
];

module.exports = questions;
