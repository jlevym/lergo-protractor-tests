'use strict';
exports.questions = require('../questions').view;

exports.nextStep = function(){
    return element(by.css('.lergo-next-step')).click();
};

exports.showReport = function(){
    return element(by.css('.lergo-lesson-show-report')).click();
};

exports.nextQuestion = function(){
    element(by.css('.lergo-show-next-question-btn')).click();
};