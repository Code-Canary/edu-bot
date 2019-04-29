let mongoose = require('mongoose');

// Require models to seed
let Lesson = require('../models/lesson');

let lessons = new Lesson({
    name: "Initial Lesson",
    questions: [
        {
            title: "How do you write a div?",
            answer: "<div></div>",
            possible_answers: [],
            type: "free_text",
            rendered_image_path: ""
        },
        {
            title: "How can you write css colors?",
            answer: null,
            possible_answers: ["Hex Codes", "With a goat", "Im sleepy"],
            type: "multiple_choice",
            rendered_image_path: ""
        }
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
    console.log('lessons  collection has been dropped.');
});

mongoose.connection.collections['users'].drop(function (err) {
    console.log('users collection has been dropped.');
});

lessons.save((err) => {
    if (err) {
        console.log('An error has occurred while seeding lessons');
        console.log('********************************************');
        console.log(err);
    } else {
        console.log('Lessons have been successfully seeded');
    }
});