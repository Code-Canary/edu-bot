let mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    user_id: String,
    lessons: [{
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        },
        status: String, // completed, in_progress
        progress: Number
    }]
}, { timestamps: true });

var User = mongoose.model('User', userSchema);
module.exports = User;