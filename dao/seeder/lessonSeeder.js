let mongoose = require('mongoose');

const questions = require('./part1');

// Require models to seed
let Lesson = require('../models/lesson').Lesson;
let Question = require('../models/question').Question;

let bottomLevelQuestions = [
    new Question({
        title: "Now add color to the div",
        type: "free_text",
        rendered_image_path: "",
        branches: [{
            answer: "<div></div>",
            next_question: null,
        }]
    }),
    new Question({
        title: "Yaay! What topic?",
        type: "free_text",
        rendered_image_path: "",
        branches: [{
            answer: "yes",
            next_question: questions[0]._id,
        },
        {
            answer: "no>",
            next_question: questions[1]._id,
        }]
    }),
    new Question({
        title: "But why? A website is nice",
        branches: [{
            answer: "Hex Codes",
            next_question: null,
        },
        {
            answer: "With a goat",
            next_question: null,
        },
        {
            answer: "Im sleepy",
            next_question: null,
        }],
        type: "multiple_choice",
        rendered_image_path: ""
    })
];

let lessons = new Lesson({
    name: "Initial Lesson",
    questions: [
        questions[0]._id,
        questions[1]._id
    ],
    lesson_template: `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <placeholder-answer-1></placeholder-answer-1>
        </body>
    </html>
    `
})


console.log('Dropping existing collections');
mongoose.connection.collections['lessons'].drop(function (err) {
    console.log('lessons collection has been dropped.');
    lessons.save((err) => {
        if (err) {
            console.log('An error has occurred while seeding lessons');
            console.log('********************************************');
            console.log(err);
        } else {
            console.log('Lessons have been successfully seeded');
        }
    });
});
mongoose.connection.collections['questions'].drop(function (err) {
    console.log('questions collection has been dropped.');
    console.log('Seeding Questions...');
    bottomLevelQuestions.forEach((bottomQ) => {
        bottomQ.save((err) => {
            if (err) {
                console.log('An error has occurred while seeding Questions');
                console.log('********************************************');
                console.log(err);
            } else {
                console.log('Questions have been successfully seeded');
            }
        });
    });

    questions.forEach((question) => {
        question.save((err) => {
            if (err) {
                console.log('An error has occurred while seeding Questions');
                console.log('********************************************');
                console.log(err);
            } else {
                console.log('Questions have been successfully seeded');
            }
        });
    });
});
mongoose.connection.collections['users'].drop(function (err) {
    console.log('users collection has been dropped.');
});



