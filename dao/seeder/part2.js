let Question = require('../models/question').Question;

const questions = [
    new Question({

        id: "q100",
        title: "Oh right, it's because div elements behave like baloons 🎈. When there's nothing in them, they are flat like a pancake.",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q101",
        }]
    }),
    new Question({
        id: "q101",
        title: "So let's fill it up",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q102",
        }]
    }),
    new Question({
        id: "q102",
        title: "Something has to go between the two lines",
        type: "informative",
        branches: [{
            answer: null,
            next_question: "q103",
        }]
    }),
    new Question({
        id: "q103",
        title: "What should we fill in?",
        type: "multi_choice",
        branches: [
            {
                answer: 'h1',
                next_question: "q104",
            },
            {
                answer: 'img',
                next_question: "q112",
            },
        ]
    }),

    // Choosing h1

    new Question({
        id: "q104",
        title: "Great! Here's how our code looks like now:",
        type: "code",
        code: `
            <div style="background-color: yellow;">
                <h1>Tiger</h1>
            </div>
        `,
        branches: [{
            answer: null,
            next_question: "q105",
        }],
    }),
    new Question({
        id: "q105",
        title: "And this is our page so far. So neat!",
        type: "preview",
        code: `
            <div style="background-color: yellow;">
                <h1>Tiger</h1>
            </div>
        `,
        branches: [{
            answer: null,
            next_question: "q106",
        }],
    }),
    new Question({
        id: "q106",
        title: "Ups, I put in my favorite animal 😇🐯 here. Let's change that with {{q015}} which you picked before!",
        type: "code",
        code: `
            <div style="background-color: yellow;">
                <h1>{{q015}}</h1>
            </div>
        `,
        branches: [
            {
                answer: null,
                next_question: "q107",
            },
        ]
    }),
    new Question({
        id: "q107",
        title: "Now your page looks like this:",
        type: "preview",
        code: `
            <div style="background-color: yellow;">
                <h1>{{q015}}</h1>
            </div>
        `,
        branches: [
            {
                answer: null,
                next_question: "q108",
            },
        ]
    }),
    new Question({
        id: "q108",
        title: "So, what's next? - We still need an image! Which html tag should we use for it?",
        type: "multi_choice",
        branches: [
            {
                answer: 'h1',
                next_question: "q109",
            },
            {
                answer: 'img',
                next_question: "q110",
            },
            {
                answer: 'omg',
                next_question: "q109",
            },
        ]
    }),
    // Wrong answer
    new Question({
        id: "q109",
        title: "That's not quite it. Please try again!",
        type: "multi_choice",
        branches: [
            {
                answer: 'h1',
                next_question: "q109",
            },
            {
                answer: 'img',
                next_question: "q110",
            },
            {
                answer: 'omg',
                next_question: "q109",
            },
        ]
    }),
    new Question({
        id: "q110",
        title: "That's it champion! This is your code now!",
        type: "code",
        code: `
            <div style="background-color: yellow;">
                <h1>{{q015}}</h1>
                <img src="{{IMAGE FROM SEARCH ABOUT q015}}" />
            </div>
        `,
        branches: [
            {
                answer: null,
                next_question: "q111",
            },
        ]
    }),
    new Question({
        id: "q111",
        title: "And this is how it looks like:",
        type: "preview",
        code: `
            <div style="background-color: yellow;">
                <h1>{{q015}}</h1>
                <img src="{{IMAGE FROM SEARCH ABOUT q015}}" />
            </div>
        `,
        branches: [
            {
                answer: null,
                // Changing color?
                next_question: "q130",
            },
        ]
    }),





    // Choosing img

    new Question({
        id: "q112",
        title: "Great! Here's how our code looks like now:",
        type: "code",
        code: `
            <div style="background-color: yellow;">
                <img src="https://static-s.aa-cdn.net/img/ios/1257058542/043b79364f061339587887aa850afc89?v=1" />
            </div>
        `,
        branches: [{
            answer: null,
            next_question: "q113",
        }],
    }),
    new Question({
        id: "q113",
        title: "And this is the rendered homepage. 'Rendered' means that the code is not drawn into your browser:",
        type: "preview",
        code: `
            <div style="background-color: yellow;">
                <img src="https://static-s.aa-cdn.net/img/ios/1257058542/043b79364f061339587887aa850afc89?v=1" />
            </div>
        `,
        branches: [{
            answer: null,
            next_question: "q114",
        }],
    }),
    new Question({
        id: "q114",
        title: "I put in my favorite animal 😇🐯 here. You surely want the image to rather be '{{q015}}!",
        type: "code",
        code: `
            <div style="background-color: yellow;">
                <img src="{{IMAGE FROM SEARCH ABOUT q015}}" />
            </div>
        `,
        branches: [
            {
                answer: null,
                next_question: "q115",
            },
        ]
    }),
    new Question({
        id: "q115",
        title: "So, what's next? - We still need a title! Which html tag should we use for it?",
        type: "multi_choice",
        branches: [
            {
                answer: 'h1',
                next_question: "q117",
            },
            {
                answer: 'zz',
                next_question: "q116",
            },
            {
                answer: 'img',
                next_question: "q116",
            },
        ]
    }),
    // Wrong answer
    new Question({
        id: "q116",
        title: "That's not quite it. Please try again!",
        type: "multi_choice",
        branches: [
            {
                answer: 'h1',
                next_question: "q117",
            },
            {
                answer: 'zz',
                next_question: "q116",
            },
            {
                answer: 'img',
                next_question: "q116",
            },
        ]
    }),
    new Question({
        id: "q117",
        title: "That's it champion! This is your code now. I took the liberty of entering a title for you already.",
        type: "code",
        code: `
            <div style="background-color: yellow;">
                <h1>{{q015}}</h1>
                <img src="{{IMAGE FROM SEARCH ABOUT q015}}" />
            </div>
        `,
        branches: [
            {
                answer: null,
                // Refer back to preview
                next_question: "q111",
            },
        ]
    }),




    // Change the color

    new Question({
        id: "q130",
        title: "Do you want to change the color?",
        type: "multi-choice",
        branches: [
            {
                answer: 'yes',
                next_question: "q132",
            },
            {
                answer: 'no',
                next_question: "q131",
            }
        ]
    }),
    new Question({
        id: "q131",
        title: "Ok, we'll keep the color as it is!",
        type: "informative",
        branches: [
            {
                answer: null,
                // Link with default color
                next_question: "q140",
            },
        ]
    }),
    new Question({
        id: "q132",
        title: "What should the new color be?",
        type: "free-text",
        branches: [
            {
                answer: null,
                next_question: "q133",
            },
        ]
    }),

    new Question({
        id: "q133",
        title: "Alright, here's the final code of our homepage!",
        type: "code",
        code: `
            <div style="background-color: {{q132}};">
                <h1>{{q015}}</h1>
                <img src="{{IMAGE FROM SEARCH ABOUT q015}}" />
            </div>
        `,
        branches: [
            {
                answer: null,
                next_question: "q134",
            },
        ]
    }),
    new Question({
        id: "q134",
        title: "And here's how your homepage looks like:",
        type: "preview",
        code: `
            <div style="background-color: {{q132}};">
                <h1>{{q015}}</h1>
                <img src="{{IMAGE FROM SEARCH ABOUT q015}}" />
            </div>
        `,
        branches: [
            {
                answer: null,
                next_question: "q135",
            },
        ]
    }),


    // Link of homepage:

    new Question({
        id: "q140",
        title: "This is the link to your first homepage! Congratulations!",
        type: "link",
        url: '{{q111}}',   // preview of final page
        branches: [
            {
                answer: null,
                next_question: "q142",
            },
        ]
    }),
    new Question({
        id: "q141",
        title: "This is the link to your first homepage! Congratulations!",
        type: "link",
        url: '{{q134}}',   // preview of final page
        branches: [
            {
                answer: null,
                next_question: "q142",
            },
        ]
    }),

    // END

    new Question({
        id: "q142",
        title: "Share it with your family and friends!",
        type: "informative",
        branches: [
            {
                answer: null,
                next_question: "q143",
            },
        ]
    }),
    new Question({
        id: "q143",
        title: "You can inspect the source code of the finished code. Instructions to do so you can find in the pdf file we attach for you here.",
        type: "informative",
        branches: [
            {
                answer: null,
                next_question: "q144",
            },
        ]
    }),
    new Question({
        id: "q144",
        title: "We wish you all the best on your journey to become a successful programmer!",
        type: "informative",
        branches: [
            {
                answer: null,
                next_question: "q145",
            },
        ]
    }),


];

module.exports = questions;
