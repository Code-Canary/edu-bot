let mongoose = require('mongoose');
let questionSchema = require('./question').questionSchema


var lessonSchema = new mongoose.Schema({
    name: String,
    questions: [questionSchema],
    lesson_template: String
}, { timestamps: true });

var Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
