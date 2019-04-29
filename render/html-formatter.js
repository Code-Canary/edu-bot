const stringUtils = require('./string-utils');
const mongoose = require('mongoose');
let User = require('../dao/models/user');

const PLACEHOLDER_DELIMITER = '$';
const DEFAULT_PLACEHOLDER_VALUE = '';


/**
 * Fetch user answers from DB, fetch lesson from DB and
 * feed togetFormattedContent for placeholder replacement
 */
exports.getRawContents = function (sender_psid, lesson_id) {
  User.findOne({ sender_psid: sender_psid }).then(function (user) {
    if (user) {
      console.log('got my user', user)
      let lesson = user.lessons.filter(lesson => lesson._id === lesson_id)[0];
      if(lesson) return getFormattedContent(lesson.lesson_template, user.answers)
    }
  });
};

/**
 * Returns HTML with all specified placeholders replaced with their values and
 * any missing placeholders is removed.
 */
exports.getFormattedContent = function (content, placeholders) {
  let tempContent = content;

  placeholders.map(placeholder => {
    tempContent = stringUtils.replaceAll(tempContent, placeholder.placeholder, placeholder.answer);
  });

  return tempContent;
};