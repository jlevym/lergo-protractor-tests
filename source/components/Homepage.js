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

exports.goToLesson = function (opts) {
    if ( !!opts.name ){
        return goToLessonByName( opts.name );
    }
};

exports.startLesson = function(opts){
    var deferred = protractor.promise.defer();
    exports.goToLesson(opts).then(function(lesson){
        lesson.element(by.css('.title a')).click().then(function(){
            deferred.fulfill();
        });
    });

    var promise = deferred.promise;
    //browser.controlFlow().execute(promise);
    return promise;
};
