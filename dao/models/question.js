let mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    title: String,
    answer: String, // empty for informative
    possible_answers: [String], // used for the multi_choice options
    type: String, // free_text, multi_choice, informative -> ignore answer value
    rendered_image_path: String
}, { timestamps: true });

var Question = mongoose.model('Question', questionSchema);
module.exports = {
    Question, questionSchema
}