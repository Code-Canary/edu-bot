let mongoose = require('mongoose');
let Lesson = require('./lesson');

var userSchema = new mongoose.Schema({
    sender_psid: String, // to identify the unique user interaction with the bot
    lessons: [{
        lesson_info: Lesson.lessonSchema,
        status: String, // completed, in_progress
        progress: Number, // count of questions answered for this lesson
        answers: [{
            placeholder: String,
            value: String,
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question'
            }
        }],
    }]
}, { timestamps: true });

var User = mongoose.model('User', userSchema);
module.exports = User;