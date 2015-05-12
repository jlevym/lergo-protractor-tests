'use strict';

exports.reports = require('./MyReports');
exports.lessons = require('./MyLessons');
exports.questions = require('./MyQuestions');


exports.getSectionByName = function(sectionName){
    return element(by.cssContainingText('ul.nav a',sectionName));
};

exports.goToMyReports = function(){
    return exports.getSectionByName('Reports').click();
};

exports.goToMyQuestions = function(){
    return exports.getSectionByName('Questions').click();
};

exports.goToMyLessons = function(){
    return exports.getSectionByName('Lessons').click();
};