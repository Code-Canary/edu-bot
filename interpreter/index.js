const User = require("../dao/models/user");
const Lesson = require('../dao/models/lesson').Lesson

const constructTextResponse = (message) => ({
      "text": message,
  });

/**
 * Returns a response
 */
const runLesson = async (sender_psid, received_message) => {
  let response = constructTextResponse('Sorry I am confused');

  const user = await User.findOne({ sender_psid: sender_psid }).exec();

  if (!user.lessons || user.lessons.length === 0) {

    const lessonOne = await Lesson.findOne();

    user.lessons.push({
        lesson_info: lessonOne,
        status: "in_progress",
        progress: 0,
    });

    if (received_message.text === 'Start') {
        user.lessons[0].progress = user.lessons[0].progress + 1;
        user.save();

        response = constructTextResponse('Hi! So you want to create a homepage?');
    } else {
        response = constructTextResponse(`You sent the message: "${received_message.text}". Now send me an attachment!`);
    }
  } else if (user.lessons[0].progress == 1) {
    // Response to: Hi! "So you want to create a homepage?"
    if (received_message.text === 'No') {
        response = constructTextResponse('Why? :-(');
    } else {
        response = constructTextResponse('What do you want your homepage to be about?');
    }

  } else {
    response = constructTextResponse(`You sent the message: "${received_message.text}". Now send me an attachment!`);
  }

  user.save();
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
