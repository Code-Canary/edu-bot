'use strict';

require('dotenv').config();

/**
 * DAO Section
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

// Webhook BOT routes
app.get('/webhook', APIController.verifyServer);
app.post('/webhook', APIController.handleWebhookEvent);

// Handles rendering of the user homepage
app.get('/render', function(req, res) {
  APIController.renderHtml(req, res, User);
});

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
