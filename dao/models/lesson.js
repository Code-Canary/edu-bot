let mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    questions: [{
        title: String,
        answer: String,
        possible_answers: [String], // used for the multi_choice options
        type: String, // free_text, multi_choice
        rendered_image_path: String
    }],
    lesson_template: String
}, { timestamps: true });

var Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;