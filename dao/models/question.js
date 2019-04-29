let mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    title: String,
    branches: [{
        answer: String,
        next_question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    }], // empty for informative
    type: String, // free_text, multi_choice, informative -> ignore answer value
    rendered_image_path: String,
}, { timestamps: true });

var Question = mongoose.model('Question', questionSchema);
module.exports = {
    Question, questionSchema
}