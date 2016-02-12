'use strict';

var layout = require('./Layout');
var logger = browser.getLogger('Homepage');

exports.route = function(){
    browser.get('#!/public/homepage');
    return browser.sleep(1000); // protractor acts better if you sleep after 'get'
};

function goToLessonByName(name) {
    logger.info('loading lesson',name);
    layout.searchLesson(name);
    return exports.getLessons().filter( function(l){
        return l.$('.title').getText().then(function( text ){

            // it seems we are actually truncating the name in lergo.
            // lets reproduce this change here so we can find the lesson.
            var actual = text.toLowerCase().trim();
            var expected = name.substring(0,40) + ( name.length > 40 ? ' ...' : '' );
            expected = expected.toLowerCase().trim();
            return  actual === expected ;
        });
    }).then(function(results){

        if ( results.length !== 1){
            throw new Error('error finding lesson by name [' + name + ']. found : ' + results.length);
        }
        return results[0];
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
 * @param {boolean} skipIntro if true will also click start lesson in intro
 * @returns {promise|*|Tc.g.promise|fd.g.promise}
 */
exports.startLesson = function(opts, skipIntro){
    var result;
    result = exports.goToLesson(opts).then(function(lesson){
        return lesson.$('.title a').click();
    });

    if ( skipIntro !== false ){
        result = require('./lesson/intro').startLesson();
    }


    return result;

};

exports.goToLessonIntro = function(opts){
    logger.info('going to lesson intro...');
    return exports.startLesson(opts, false);
};
