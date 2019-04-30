const request = require("request");
const Flickr = require('flickrapi');
const flickrOptions = {
    api_key: "a260c2cc20d55d630365fbc4c8b1c9b6",
    secret: "ef0e017684ae9935"
};

var User = require("../dao/models/user");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const MessageTemplates = require('./messageTemplates');
const getRawContents = require('../render/html-formatter').getRawContents;
const Lesson = require('../dao/models/lesson').Lesson

const { runLesson } = require('../interpreter/index');

async function handleMessage(sender_psid, received_message) {

    var user = await User.findOne({ sender_psid: sender_psid }).exec();

    if (!user) {
        console.log("Creating new user...");
        user = new User({
            sender_psid: sender_psid,
        });
        user = await user.save();
    }

    let response;
    var postbackResponse = {};

    getRawContents(sender_psid, null);

    if (received_message.text) {
        // Create the payload for a basic text message, which will be added to the body of our request to the Send API
        response = await runLesson(sender_psid, received_message);
    }

    // else if (received_message.attachments) {
    //     // Get the URL of the message attachment
    //     // let attachment_url = received_message.attachments[0].payload.url;
    //     response = constructTemplateResponse('Nothing');
    // }

    postbackResponse = constructResponseMessage(sender_psid, response)
    // Send the message to acknowledge the postback
    callSendAPI(postbackResponse);
}

function handlePostback(sender_psid, received_postback) {
    var response;
    // Get the payload for the postback
    let payload = received_postback.payload;

    console.log("Postback response:", received_postback);

    // Set the response based on the postback payload
    if (payload === "yes") {
        response = constructTextResponse("Thanks!");
    } else if (payload === "no") {
        response = constructTextResponse("Oops, try sending another image.");
    }

    let postbackResponse = constructResponseMessage(sender_psid, response)

    // Send the message to acknowledge the postback
    callSendAPI(postbackResponse);
}

function callSendAPI(userMessage) {
    // Construct the message body

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v3.2/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "json": userMessage,
    }, (err, res, body) => {
        switch (res.statusCode) {
            case 200:
                console.log("Message sent to user successfully!");
                break;
            default:
                console.error("Unable to send message:", userMessage);
                console.error("Received Error:", err);
                console.error("Response was:", body);
                break;
        }
    });
}

function constructResponseMessage(sender_psid, response) {
    return {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": sender_psid,
        },
        "message": response,
    };
}

function constructTextResponse(message) {
    return {
        "text": message,
    };
}

function constructTemplateResponse(template) {
    return MessageTemplates[template]({
        title: '',
        subtitle: '',
        buttons: '',
        image_url: '',
        url: '',
        media_type: '',
        attachment_id: '',
    })
}

function seachMatchingPicture(tag) {
    Flickr.tokenOnly(flickrOptions, function (error, flickr) {
        flickr.photos.search({
            tags: tag,
            safe_search: 1,
            content_type: 1,
            per_page: 4,
            media: 'photos',
            extras: 'url_o'
        }, function (err, result) {
            if (err) { throw new Error(err); }
            else {
                // returns array, use url_o to get the image link.
                return result.photos.photo
            }
        })
    });
}

module.exports = {
    constructTemplateResponse,
    handleMessage: handleMessage,
    handlePostback: handlePostback,
    seachMatchingPicture
}