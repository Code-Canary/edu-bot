let Question = require('../models/question').Question;

const questions = [
    new Question({ // 0
        id: "q000",
        title: "Hi! Do you want to build a homepage?",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q001",
        }]
    }),
    new Question({ // 00
        id: "q00",
        title: "Why.. 😭 Please!! 🙏 It will be a lot of fun!",
        type: "multi_choice",
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
        title: "What are you really passionate about? A hobby or a favorite animal? Give me a word please! 😊",
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
        title: "Look, this here is a homepage I would imagine to be a nice page about {{q001}}.",
        type: "preview",
        code: `
            <div style="background-color: beige;">
                <h1>{{q001}}</h1>
                <img src="{{q001}}" />
            </div>
        `,
        branches: [{
            answer: null,
            next_question: "q004",
        }],
    }),
    new Question({ // 4
        id: "q004",
        title: "Does it look good? Do you like it? 🤓",
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
    new Question({ // 5
        id: "q005",
        title: "Well, everyone's taste is different. 😝 I live it 😇 and I want to tell you a bit more about it.",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q007",
        }],
    }),
    new Question({ // 6
        id: "q006",
        title: "Nice! 😃 I want to tell you a bit more about it!",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q007",
        }]
    }),
    new Question({ // 7
        id: "q007",
        title: "A homepage is made out of programming code (or just 'code' in short) which is written by programmers. You will also be a programmer soon! That's how the code looks like:",
        type: "code",
        code: `
            <div style="background-color: beige;">
                <h1>{{q001}}</h1>
                <img src="{{q001}}" />
            </div>
        `,
        branches: [{
            answer: null,
            next_question: "q008",
        }]
    }),
    new Question({
        id: "q008",
        title: "That might look a bit scary, but it's very easy, you will see!",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q009",
        }]
    }),
    // new Question({
    //     id: "q009",
    //     title: "You can imagine '<div />' to be a box in which we throw everything else. Here we throw a '<h1>{{q001}}</h1>' and '<img src=\"{{q001}}\" />' into the box.",
    //     type: "code",
    //     code: `
    //         <div style="background-color: beige;">
    //             <h1>{{q001}}</h1>
    //             <img src="{{q001}}" />
    //         </div>
    //     `,
    //     branches: [{
    //         answer: null,
    //         next_question: "q010",
    //     }]
    // }),


    new Question({
        id: "q009",
        title: "Let us change the code a bit and see how it affects the page",
        type: "informative",
        branches: [{
            answer: "",
            next_question: "q010",
        }]
    }),
    new Question({
        id: "q010",
        title: "So, please tell me your favorite color 🎨:",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q011",
        }]
    }),
    new Question({
        id: "q011",
        title: "Let us change the background color! How should we change the first line? How should it look like?",
        type: "multi_choice",
        branches: [{
            answer: "<div style=\"background‐color: {{q010}}\">",
            next_question: "q013",
        },
        {
            answer: "<div style=\"background‐color: pink\">",
            next_question: "q012",
        },
        {
            answer: "<div style=\"red\">",
            next_question: "q012",
        }]
    }),
    new Question({ // 10
        id: "q012",
        title: "No, that's not quite right. Try again! 🙂",
        type: "multi_choice",
        branches: [{
            answer: "<div style=\"background‐color: {{q010}}\">",
            next_question: "q013",
        },
        {
            answer: "<div style=\"background‐color: pink\">",
            next_question: "q012",
        },
        {
            answer: "<div style=\"red\">",
            next_question: "q012",
        }]
    }),
    new Question({
        id: "q013",
        title: "You're AWESOME! 😎🤩 You just changed the styling of an HTML element! 🎉",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q014",
        }]
    }),
    new Question({
        id: "q014",
        title: "Here's how the code looks like after our change:",
        type: "code",
        code: `
            <div style="background-color: beige;">
                <h1>{{q001}}</h1>
                <img src="{{q001}}" />
            </div>
        `,
        branches: [{
            answer: null,
            next_question: "q015",
        }]
    }),
    new Question({
        id: "q015",
        title: "You see, we don't have to understand every thing here, but can already make changes! That's so cool! 😻",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q016",
        }]
    }),
    new Question({
        id: "q016",
        title: "HTML is the language in which websites are written and 'style' is a so-called Attribute. It styles HTML elements, like a 'div'.",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q017",
        }]
    }),
    new Question({ // 13
        id: "q017",
        title: " People like to style themselves, so do HTML elements! We just changed the background-color style of a 'div' element. 👩🏻‍🎨",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q018",
        }]
    }),
    new Question({ // 13
        id: "q018",
        title: "Now it's your turn! You'll create your own website.",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q019",
        }]
    }),
    new Question({ // 14
        id: "q019",
        title: "What should your site be about?",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q020",
        }]
    }),
    new Question({ // 15
        id: "q020",
        title: "Great idea! {{q019}}! I always want more! So cool!",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q021",
        }]
    }),
    new Question({
        id: "q021",
        title: "So how do we start? What is the name of the component of the outer layer? Do you remember?",
        type: "multi_choice",
        branches: [{
            answer: "div",
            next_question: "q022",
        }]
    }),
    new Question({ // 17
        id: "q022",
        title: "Yes! The code is as below.",
        type: "code",
        code: `<div></div>`,
        branches: [{
            answer: null,
            next_question: "q023",
        }]
    }),
    new Question({ // 18
        id: "q023",
        title: "Here is how it looks.",
        type: "preview",
        code: `<div></div>`,
        branches: [{
            answer: null,
            next_question: "q024",
        }]
    }),
    new Question({ // 19
        id: "q024",
        title: "Isn't it beautiful? Empty nothingness! What do you think?",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q025",
        }]
    }),
    new Question({
        id: "q025",
        title: "Well, let's add some color, which one do you want?",
        type: "free_text",
        branches: [{
            answer: "",
            next_question: "q026",
        }]
    }),
    new Question({ // 17
        id: "q026",
        title: "Yes! The code is as below.",
        type: "code",
        code: `<div style="background-color: {{q025}}" >
        </div>`,
        branches: [{
            answer: null,
            next_question: "q027",
        }]
    }),
    new Question({ // 21
        id: "q027",
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
