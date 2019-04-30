let Question = require('../models/question').Question;

const questions = [
    new Question({ // 0
        id: "q000",
        title: "Do you want to build a homepage?",
        type: "informative",
        branches: [{
            answer: "",
            next_question: "q001",
        }]
    }),
    new Question({ // 00
        id: "q00",
        title: "Why..Think about again :(",
        type: "button",
        branches: [{
            answer: "yes",
            next_question: "q001",
        },
        {
            answer: "no",
            next_question: "q00",
        }]
    }),
    new Question({ // 1
        id: "q001",
        title: "What do you want your homepage to be about?",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q002",
        }]
    }),
    new Question({ // 2
        id: "q002",
        title: "Great! I love {{q001}}!",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q003",
        }]
    }),
    new Question({ // 3
        id: "q003",
        title: "This is a site I would imagine to be nice home page about {{q001}}.",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q004",
        }]
    }),
    new Question({ // 4
        id: "q004",
        title: "Do you like it?",
        type: "quickReply",
        branches: [{
            answer: "yes",
            next_question: "q006",
        },
        {
            answer: "no",
            next_question: "q005",
        }]
    }),
    new Question({ // 5
        id: "q005",
        title: "What about this one?",
        type: "multi_choice",
        branches: [{
            answer: "yes",
            next_question: "q006",
        },
        {
            answer: "no",
            next_question: "q005",
        }]
    }),
    new Question({ // 6
        id: "q006",
        title: "A homepage is made out of HTML.",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q007",
        }]
    }),
    new Question({ // 7
        id: "q007",
        title: "I load the following code behind the scenes:",
        type: "code",
        code: `need to fill full code`,
        branches: [{
            answer: null,
            next_question: "q008",
        }]
    }),
    new Question({ // 8
        id: "q008",
        title: "What\’s your favorite color?",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q009",
        }]
    }),
    new Question({ // 9
        id: "q009",
        title: "Oh, change the colors, how would we do this?",
        type: "multi_choice",
        branches: [{
            answer: "<div style=\"background‐color:red\">",
            next_question: "q011",
        },
        {
            answer: "<div color=\"red\">",
            next_question: "q010",
        }]
    }),
    new Question({ // 10
        id: "q010",
        title: "Hmm..think about again..",
        type: "multi_choice",
        branches: [{
            answer: "<div style=\"background‐color:red\">",
            next_question: "q011",
        },
        {
            answer: "<div color=\"red\">",
            next_question: "q010",
        }]
    }),
    new Question({ // 11
        id: "q011",
        title: "You\'re AWESOME!",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q012",
        }]
    }),
    new Question({ // 12
        id: "q012",
        title: "A style is adding some nice things to it: style=\“\”. Like human, we can also style our HTML, so it looks pretty!",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q013",
        }]
    }),
    new Question({ // 13
        id: "q013",
        title: "Now, it’s your turn!",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q014",
        }]
    }),
    new Question({ // 14
        id: "q014",
        title: "Create your own site. What should your site be about?",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q015",
        }]
    }),
    new Question({ // 15
        id: "q015",
        title: "Great idea! I love {{q014}}!",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q016",
        }]
    }),
    new Question({ // 16
        id: "q016",
        title: "So how do we have to start? What is the proper component as the outer layer?",
        type: "multi_choice",
        branches: [{
            answer: "div",
            next_question: "q017",
        }]
    }),
    new Question({ // 17
        id: "q017",
        title: "Yes! The code is as below.",
        type: "code",
        code: `<div></div>`,
        branches: [{
            answer: null,
            next_question: "q018",
        }]
    }),
    new Question({ // 18
        id: "q018",
        title: "Here is how it works.",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q019",
        }]
    }),
    new Question({ // 19
        id: "q019",
        title: "Isn\'t it beautiful? It\'s so easy! How do you think?",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q020",
        }]
    }),
    new Question({ // 20
        id: "q020",
        title: "Well, let\'s add some color, which one do you want?",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q021",
        }]
    }),
    new Question({ // 21
        id: "q021",
        title: "Still nothing to see..Is it just me being color-blind or is there something?",
        type: "code",
        code: `<div style="background‐color:{{q020}}"></div>`,
        branches: [{
            answer: null,
            next_question: "q100",
        }]
    }),
];

module.exports = questions;
