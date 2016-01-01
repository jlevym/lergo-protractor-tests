'use strict';

var components = require('../components');

/**
 *
 * @description
 *  - logs in
 *  - goes to my section --> lessons
 *  - goes to given lesson
 *  - starts lesson
 *
 * @param {object} opts
 * @param {string} opts.username
 * @param {string} opts.password
 * @param {LessonSearchDetails} opts.lesson
 */

module.exports = function loginAndStartLesson( opts ){
    browser.get('/');
    components.loginPage.load().login( opts.username, opts.password  );
    components.layout.goToUserSection();
    components.mySection.goToMyLessons();
    components.mySection.lessons.goToLesson( opts.lesson );
    components.lesson.intro.startLesson();
};
