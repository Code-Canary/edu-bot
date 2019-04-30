let Question = require('../models/question').Question;

const questions = [
    new Question({ // 0
        id: "q000",
        title: "What do you want your homepage to be about?",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: "",
            next_question: "q001",
        }]
    }),
    new Question({ // 1
        id: "q001",
        title: "Great! I love dogs!",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: null,
            next_question: "q002",
        }]
    }),
    new Question({ // 2
        id: "q002",
        title: "This is a site I would imagine to be nice home page about to dogs.",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: null,
            next_question: "q003",
        }]
    }),
    new Question({ // 3
        id: "q003",
        title: "Do you like it?",
        type: "free_text",
        rendered_image_path: "",
        branches: [{
            answer: "yes",
            next_question: "q005",
        },
        {
            answer: "no",
            next_question: "q004",
        }]
    }),
    new Question({ // 4
        id: "q004",
        title: "What about this one?",
        type: "quick_replies",
        rendered_image_path: "",
        branches: [{
            answer: "yes",
            next_question: "q005",
        },
        {
            answer: "no",
            next_question: "q004",
        }]
    }),
    new Question({ // 5
        id: "q005",
        title: "A homepage is made out of HTML.",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: null,
            next_question: "q006",
        }]
    }),
    new Question({ // 6
        id: "q006",
        title: "I load the following code behind the scenes:",
        type: "free_text",
        rendered_image_path: "",
        branches: [{
            answer: null,
            next_question: "q007",
        }]
    }),
    new Question({ // 7
        id: "q007",
        title: "What\’s your favorite color?",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: "",
            next_question: "q008",
        }]
    }),
    new Question({ // 8
        id: "q008",
        title: "Oh, change the colors, how would we do this?",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: "<div style=\"background‐color:red\">",
            next_question: "q010",
        },
        {
            answer: "<div color=\"red\">",
            next_question: "q009",
        }]
    }),
    new Question({ // 9
        id: "q009",
        title: "Think about again..",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: "<div style=\"background‐color:red\">",
            next_question: "q010",
        },
        {
            answer: "<div color=\"red\">",
            next_question: "q009",
        }]
    }),
    new Question({ // 10
        id: "q010",
        title: "You\'re AWESOME!",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: null,
            next_question: "q011",
        }]
    }),
    new Question({ // 11
        id: "q011",
        title: "A style is adding some nice things to it: \
        style=\“\”. Like human, we can also style our HTML, \
        so it looks pretty!",
        type: "free_text",
        rendered_image_path: null,
        branches: [{
            answer: null,
            next_question: "q012",
        }]
    })
];

module.exports = questions;
