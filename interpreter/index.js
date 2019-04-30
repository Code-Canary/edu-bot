const User = require("../dao/models/user");
const { Lesson } = require('../dao/models/lesson');
const { Question } = require('../dao/models/question');
const { quickReply } = require('../service/messageTemplates');

const {getPlaceholders, fillTheBlanks} = require("../render/x-to-image");

const constructTextResponse = (message) => ({
    "text": message,
});

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
      const idx = answers.findIndex(({question}) => question == match);
      if(idx >= 0){
        const {question, value} = answers[idx];
        placeholders[growMustache(question)] = value
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
    const user = await User.findOne({ sender_psid: sender_psid }).exec();

    var response = {};

    if (user.lessons.length === 0 && !userInput === 'Start') {
        return response;
    }

    if (user.lessons.length === 0) {
        const lessonOne = await Lesson.findOne();

        await user.lessons.push({
            lesson_info: lessonOne,
            status: "in_progress",
            progress: 'q000',
        });


        // We only have 1 lesson now, so the currentLesson is always the first one
        // const currentLesson = user.lessons[0];

        // const question = await Question.findOne({ id: currentLesson.progress });

        // currentLesson.progress = question.branches[0].next_question;

        // response = constructTextResponse(question.title);

        // await user.save();
        // return response;
    }

    // STARTING
    // if (userInput === 'Start') {

    // }

    // NORMAL CASE

    // set new progress
    let newProgress;
    const currentLesson = user.lessons[0];
    const currentProgress = currentLesson.progress;

    // Get the question for the progress the user has
    const question = await Question.findOne({ id: currentProgress });

    console.log({ currentProgress, question });

    if (question) {
        response = constructTextResponse(fill(question.title, currentLesson.answers));

        // const previousAnswer = currentLesson.answers.find(answer => answer.question === currentProgress);
        // console.log({ previousAnswer });

        /**
         * NEXT QUESTION
         */
        // Question that doesnt require answer
        if (question.branches.length === 1 && !question.branches[0].answer) {
            // TODO: Save user selection here
            currentLesson.answers.push({ value: userInput, question: question._id });
            newProgress = question.branches[0].next_question;
            currentLesson.progress = newProgress;
            await user.save();
            return response;
        }

        if (question.branches.length === 1 && question.branches[0].answer !== null) {
            // TODO: NLP check to match percentage of the user input to the answer.
            // for now, it'll be hardcoded.
            if (userInput === question.branches[0].answer) {
                currentLesson.answers.push({ value: userInput, question: question._id });
                newProgress = question.branches[0].next_question;
                currentLesson.progress = newProgress;
                await user.save();
                return response;
            } else {
                return defaultResponse;
            }
        }

        /**
         * TODO: Two or more answers for the question, the question type should be evaluated and
         * a correct response message structure should be sent
         * */
        let quickReplies = [];
        question.branches.forEach(branch => {
            quickReplies.push({
                "content_type": "text",
                "title": branch.answer,
                "image_url": "",
                "payload": "{}"
            });
        })
        response = quickReply(fill(question.title, currentLesson.answers), quickReplies);
        if (newProgress === undefined) {
            // free text
            // TODO: Add free text handling here!
            newProgress = question.branches[0].next_question;
        }
    }

    user.lessons[0].progress = newProgress;
    await user.save();
    return response;
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
