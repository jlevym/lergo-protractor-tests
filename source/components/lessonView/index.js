'use strict';
exports.questions = require('./questions');

exports.nextStep = function(){
    return element(by.css('.lergo-next-step')).click();
};

exports.showReport = function(){
    return element(by.css('.lergo-lesson-show-report')).click();
};