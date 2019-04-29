import { Mongoose } from "mongoose";

var lessonSchema = new Mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
});
var lesson = Mongoose.model('Lesson', lessonSchema);
module.exports = lesson;