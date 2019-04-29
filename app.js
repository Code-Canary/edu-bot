'use strict';

require('dotenv').config();
const connect = require("./dao/connector");

// Open DB Connection 
connect();

let Lesson = require('./dao/models/lesson');
let User = require('./dao/models/user');

const APIController = require('./controllers/APIController');

// Imports dependencies and set up http server
const
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

// Accepts POST requests at /webhook endpoint
app.post('/webhook', APIController.handleWebhookEvent);
// Accepts GET requests at the /webhook endpoint
app.get('/webhook', APIController.verifyServer);

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
