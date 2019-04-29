let mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    sender_psid: String, // to identify the unique user interaction with the bot
    lessons: [{
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        },
        status: String, // completed, in_progress
        progress: Number, // count of questions answered for this lesson
        answers: [{
            placeholder: String,
            value: String
        }]
    }]
}, { timestamps: true });

var User = mongoose.model('User', userSchema);
module.exports = User;