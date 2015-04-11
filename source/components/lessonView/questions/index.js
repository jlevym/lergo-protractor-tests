'use strict';

exports.trueFalse = require('./trueFalse');


exports.nextQuestion = function(){
    element(by.css('.lergo-show-next-question-btn')).click();
};