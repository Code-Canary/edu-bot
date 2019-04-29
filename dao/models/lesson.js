let mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema({
    name: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    lesson_template: String
}, { timestamps: true });

var Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = {
    Lesson,
    lessonSchema
}
