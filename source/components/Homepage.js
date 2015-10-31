'use strict';

var layout = require('./Layout');
var logger = require('log4js').getLogger('Homepage');

function goToLessonByName(name) {
    logger.info('loading lesson',name);
    layout.searchLesson(name);
    return exports.getLessons().then(function (lessons) {
        expect(lessons.length).toBe(1, 'lesson [' + name + '] should exist');
        return lessons[0];
    });


}

exports.getLessons = function () {
    return element.all(by.repeater('lesson in lessons'));
};

/**
 * @typedef {object} LessonSearchDetails
 * @property {string} [name] - the name of the lesson
 */
/**
 *
 * @param opts
 * @returns {*}
 */
exports.goToLesson = function (opts) {
    if ( !!opts.name ){
        return goToLessonByName( opts.name );
    }
};

/**
 *
 * @param {LessonSearchDetails} opts
 * @returns {promise|*|Tc.g.promise|fd.g.promise}
 */
exports.startLesson = function(opts){
    return exports.goToLesson(opts).then(function(lesson){
        return lesson.$('.title a').click();
    });

};
