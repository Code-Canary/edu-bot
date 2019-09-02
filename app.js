'use strict';

require('dotenv').config();
const BootBot = require('bootbot');

const APP_SECRET = process.env.APP_SECRET;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

/**
 * DAO Section
 *
 * Initialize DB connection
 * Initialize models
 */
const connect = require("./dao/connector");

// Open DB Connection
connect();

const Lesson = require('./dao/models/lesson');
const User = require('./dao/models/user');
const Question = require('./dao/models/question').Question;
const APIController = require('./controllers/APIController');
const constructTemplateResponse = require('./service/messengerService').constructTemplateResponse;
const searchMatchingPicture = require('./service/messengerService').searchMatchingPicture;

// Call seeder for sample lessons.
require('./dao/seeder/lessonSeeder');

/**
 * Express Sections
 * Imports dependencies and set up http server
 */
const
    express = require('express'),
    body_parser = require('body-parser'),
    app = express().use(body_parser.json()); // creates express http server

const bot = new BootBot({
    accessToken: ACCESS_TOKEN,
    verifyToken: VERIFY_TOKEN,
    appSecret: APP_SECRET
});

APIController.setupUserConversation(bot);

bot.start(1337);

// Webhook BOT routes
// app.get('/webhook', APIController.verifyServer);
// app.post('/webhook', APIController.handleWebhookEvent);

// // Handles rendering of the user homepage
// app.get('/render', function (req, res) {
//     APIController.renderHtml(req, res, User);
// });

// // Sets server port and logs message on success
// app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
