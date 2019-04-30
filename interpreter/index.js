const request = require("request");
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const User = require("../dao/models/user");
const { Lesson } = require('../dao/models/lesson');
const { Question } = require('../dao/models/question');
const { quickReply } = require('../service/messageTemplates');
const messengerService = require('../service/messengerService');
const MessageTemplates = require('../service/messageTemplates');

const { getPlaceholders, fillTheBlanks } = require("../render/x-to-image");

const constructTextResponse = (message) => {
    return { "text": message }
}

const shaveMustache = t => t.replace("{{", "").replace("}}", "");
const growMustache = t => `{{${t}}}`;

/**
 * Fills in a string which may have placeholders
 * @param {string} text
 * @param {[{question: string, value: string}]} answers
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

/*
console.log(
  fill("Great! I love {{q001}} & {{q000}}!", [
    {question: "q000", value: "dogs"},
    {question: "q001", value: "cats"},
    {question: "q002", value: "bananas"},
  ]) // > Great! I love cats & dogs!
)

console.log(
  fill("I love bananas!", [
    {question: "q000", value: "dogs"},
    {question: "q001", value: "cats"},
    {question: "q002", value: "bananas"},
  ]) // > I love bananas!
)
*/

/**
 * Returns a response
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
    var question = await Question.findOne({ id: currentProgress });

    if (question) {
        // Question that doesnt require answer
        switch (question.type) {
            case 'informative':
                newProgress = question.branches[0].next_question;
                currentLesson.progress = newProgress;
                response = constructTextResponse(fill(question.title, currentLesson.answers));
                await user.save();
                return response;
            case 'free_text':
                // if (userInput === question.branches[0].answer) {
                currentLesson.answers.push({ value: userInput, questionId: currentProgress, question: question._id });
                question = await Question.findOne({ id: question.branches[0].next_question });
                // if (currentProgress === "q001") {
                //     question = await Question.findOne({ id: question.branches[0].next_question });
                // }
                newProgress = question.branches[0].next_question;

                currentLesson.progress = newProgress;
                response = constructTextResponse(fill(question.title, currentLesson.answers));
                await user.save();
                return response;
            // } else {
            //     return defaultResponse;
            // }
            default:
                /**
                 * TODO: Two or more answers for the question, the question type should be evaluated and
                 * a correct response message structure should be sent
                 * */
                currentLesson.answers.push({ value: userInput, questionId: currentProgress, question: question._id });
                let filterQuestion = question;
                filterQuestion.title = fill(question.title, currentLesson.answers);
                response = quickReply(filterQuestion.title, question.branches);
                user.lessons[0].progress = newProgress;
                await user.save();
                return response;
        }
    }

    // if (question.branches.length === 1 && !question.branches[0].answer) {
    //     // TODO: Save user selection here
    //     newProgress = question.branches[0].next_question;
    //     currentLesson.progress = newProgress;
    //     currentLesson.answers.push({ value: userInput, questionId: currentProgress, question: question._id });
    //     response = constructTextResponse(fill(question.title, currentLesson.answers));
    //     await user.save();
    //     return response;
    // }

    // // Question that has only 1 answer
    // if (question.branches.length === 1 && question.branches[0].answer !== null) {
    //     // TODO: NLP check to match percentage of the user input to the answer.
    //     // for now, it'll be hardcoded.
    //     if (userInput === question.branches[0].answer) {
    //         currentLesson.answers.push({ value: userInput, questionId: currentProgress, question: question._id });
    //         newProgress = question.branches[0].next_question;
    //         currentLesson.progress = newProgress;
    //         response = constructTextResponse(fill(question.title, currentLesson.answers));
    //         await user.save();
    //         return response;
    //     } else {
    //         return defaultResponse;
    //     }
    // }

    // /**
    //  * TODO: Two or more answers for the question, the question type should be evaluated and
    //  * a correct response message structure should be sent
    //  * */
    // currentLesson.answers.push({ value: userInput, questionId: currentProgress, question: question._id });
    // const filterQuestion = question;
    // filterQuestion.title = fill(question.title, currentLesson.answers);
    // response = quickReply(question.title, question.branches);
    // if (newProgress === undefined) {
    //     // free text
    //     // TODO: Add free text handling here!
    //     newProgress = question.branches[0].next_question;
    // }

    // user.lessons[0].progress = newProgress;
    // await user.save();
    // return response;
}

const resetLessonsForUser = async sender_psid => {
    const user = await User.findOne({ sender_psid: sender_psid }).exec();

    user.lessons = [];
    await user.save();
}


module.exports = {
    runLesson,
    resetLessonsForUser,
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
