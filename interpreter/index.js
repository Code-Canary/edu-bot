const User = require("../dao/models/user");
const { Lesson } = require('../dao/models/lesson');
const { Question } = require('../dao/models/question');

const constructTextResponse = (message) => ({
      "text": message,
  });

/**
 * Returns a response
 */
const runLesson = async (sender_psid, received_message) => {
  let response = constructTextResponse('Sorry I am confused');

  const user = await User.findOne({ sender_psid: sender_psid }).exec();

  // STARTING
  if (received_message.text === 'Start') {
    const lessonOne = await Lesson.findOne();

    await user.lessons.push({
        lesson_info: lessonOne,
        status: "in_progress",
        progress: 'q000',
    });

    // We only have 1 lesson now, so the currentLesson is alwasy the first one
    const currentLesson = user.lessons[0];

    const question = await Question.findOne({ id: currentLesson.progress });

    currentLesson.progress = question.branches[0].next_question;

    response = constructTextResponse(question.title);

    await user.save();
    return response;
  }

  // NORMAL CASE

  // set new progress
  let newProgress;

  const currentLesson = user.lessons[0];
  const currentProgress = currentLesson.progress;
  const question = await Question.findOne({ id: currentProgress });

  console.log({ currentProgress, question });

  if (question) {
    response = constructTextResponse(question.title);


    const previousAnswer = currentLesson.answers.find(answer => answer.question === currentProgress);
    console.log({ previousAnswer });

    /**
     * NEXT QUESTION
     */

    // Only one answer
    if (question.branches.length === 1 && question.branches[0].answer === null) {
      // set answer
      currentLesson.answers.push({ value: received_message.text, question: question._id });
      // set progress
      newProgress = question.branches[0].next_question;
    }

    // Two or more answers --> evaluate response
    if (question.branches.length > 1) {
      // set answer
      const answerGiven = received_message.text;
      currentLesson.answers.push({ value: answerGiven, question: question._id });
      // set progress
      question.branches.forEach(branch => {
        if (branch.answer === answerGiven) {
          // matching answer
          currentLesson.answers.push({ value: answerGiven, question: branch.next_question });
          newProgress = branch.nextQuestion;
        }
      })
      if (newProgress === undefined) {
        // free text
        // TODO: Add free text handling here!
        newProgress = question.branches[0].next_question;
      }
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
