let mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

function connect() {
    mongoose.connect(url, { useNewUrlParser: true });
}

module.exports = connect;