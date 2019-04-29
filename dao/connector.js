import { Mongoose } from "mongoose";
const url = process.env.MONGODB_URI;

export function connect() {
    Mongoose.connect(url, { useNewUrlParser: true });
}