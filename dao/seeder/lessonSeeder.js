let mongoose = require('mongoose');

// Require models to seed
let Lesson = require('../models/lesson').Lesson;
let Question = require('../models/question').Question;

let questions = [
    new Question({
        title: "How do you write a div?",
        type: "free_text",
        rendered_image_path: "",
        branches: [{
            answer: "<div></div>",
            question: null,
        }]
    }),
    new Question({
        title: "How can you write css colors?",
        branches: [{
            answer: "Hex Codes",
            question: null,
        },
        {
            answer: "With a goat>",
            question: null,
        },
        {
            answer: "Im sleepy>",
            question: null,
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



