import { Mongoose } from "mongoose";

var userSchema = new Mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
});
var user = Mongoose.model('User', userSchema);
module.exports = user;