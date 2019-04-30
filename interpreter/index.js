const request = require("request");
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const User = require("../dao/models/user");
const { Lesson } = require('../dao/models/lesson');
const { Question } = require('../dao/models/question');
const { quickReply, list } = require('../service/messageTemplates');
const messengerService = require('../service/messengerService');
const MessageTemplates = require('../service/messageTemplates');

const { getPlaceholders, fillTheBlanks, codeAsImage, imagePath, htmlAsImage } = require("../render/x-to-image");

const constructTextResponse = (message) => {
    return { "text": message }
}

const constructImageResponse = (title, image_url) => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        title,
                        image_url,
                        //"subtitle":"<SUBTITLE_TEXT>", //TODO: maybe this is better than title?
                    },
                ]
            }
        }
    }
}

const shaveMustache = t => t.replace("{{", "").replace("}}", "");
const growMustache = t => `{{${t}}}`;

/**
 * Fills in a string which may have placeholders
 * @param {string} text
 * @param {[{question: string, value: string}]} answers
 * fill("I love bananas!", [
    {question: "q000", value: "dogs"},
    {question: "q001", value: "cats"},
    {question: "q002", value: "bananas"},
  ]) // > I love bananas!
 */
const fill = (text, answers) => {
    const matches = getPlaceholders(text) || [];
    const placeholders = matches.map(shaveMustache).reduce((placeholders, match) => {
        const idx = answers.findIndex(({ questionId }) => questionId == match);
        if (idx >= 0) {
            const { questionId, value } = answers[idx];
            placeholders[growMustache(questionId)] = value
        }
        return placeholders;
    }, {})

    return fillTheBlanks(text, placeholders);
};

/**
 *
 * @param {string} sender_psid the unique user ID
 * @param {string} received_message the text message received from chat
 */
const runLesson = async (sender_psid, received_message) => {
    const userInput = received_message.text;
    const defaultResponse = constructTextResponse("Sorry, I don't understand that answer.");

    const user = await User.findOne({ sender_psid: sender_psid });

    var response = {};

    // NORMAL CASE
    let newProgress;
    const currentLesson = user.lessons[0];
    const currentProgress = currentLesson.progress;
    let questions = await Question.find({ id: currentProgress });
    var question = questions[0];

    if (question) {
        // Question that doesnt require answer
        switch (question.type) {
            //TODO: imagePath may need domain prepended...
            case 'code':
                newProgress = question.branches[0].next_question;
                currentLesson.progress = newProgress;
                response = constructImageResponse(question.title, question.url);
                await user.save();
                return { response, type: question.type };
            case 'preview':
                newProgress = question.branches[0].next_question;
                currentLesson.progress = newProgress;
                response = constructImageResponse(fill(question.title, currentLesson.answers), question.url);
                await user.save();
                return { response, type: question.type };
            case 'informative':
                question = await Question.findOne({ id: question.branches[0].next_question });
                newProgress = question.id;
                currentLesson.progress = newProgress;
                response = constructTextResponse(fill(question.title, currentLesson.answers));
                await user.save();
                // await runLesson(sender_psid, received_message);
                return { response, type: question.type };
            case 'free_text':
                // if (userInput === question.branches[0].answer) {
                var correctBranch = question.branches.find(branch => branch.answer === userInput);
                currentLesson.answers.push({ value: userInput, questionId: currentProgress, question: question._id });
                question = await Question.findOne({ id: question.branches[0].next_question });
                newProgress = question.id;
                currentLesson.progress = newProgress;
                response = constructTextResponse(fill(question.title, currentLesson.answers));
                await user.save();
                return { response, type: question.type };
            // } else {
            //     return defaultResponse;
            // }
            case 'multi_choice':
                currentLesson.answers.push({ value: userInput, questionId: currentProgress, question: question._id });
                // let filterQuestion = question;
                // filterQuestion.title = fill(question.title, currentLesson.answers);
                response = quickReply(question.title, question.branches);
                question = await Question.findOne({ id: question.branches[0].next_question });
                newProgress = question.id;
                currentLesson.progress = newProgress;
                await user.save();
                return { response, type: question.type };
            default:
                /**
                 * TODO: Two or more answers for the question, the question type should be evaluated and
                 * a correct response message structure should be sent
                 * */
                currentLesson.answers.push({ value: userInput, questionId: currentProgress, question: question._id });
                // let filterQuestion = question;
                // filterQuestion.title = fill(question.title, currentLesson.answers);
                response = quickReply(question.title, question.branches);
                question = await Question.findOne({ id: question.branches[0].next_question });
                newProgress = question.id;
                currentLesson.progress = newProgress;
                await user.save();
                return { response, type: question.type };
        }
    }
}

function constructTemplateResponse(question) {
    return MessageTemplates[question.type]({
        title: question.title,
        subtitle: '',
        buttons: question.branches,
        image_url: question.rendered_image_path,
        url: '',
        media_type: '',
        attachment_id: '',
    })
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


module.exports = {
    runLesson,
}
