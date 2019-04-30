let mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    id: String,
    title: String,
    branches: [{
        answer: String,
        next_question: String
    }], // empty for informative
    type: String, // free_text, multi_choice, informative -> ignore answer value
    rendered_image_path: String,
}, { timestamps: true });

var Question = mongoose.model('Question', questionSchema);
module.exports = {
    Question, questionSchema
}