'use strict';

exports.reports = require('./MyReports');
exports.lessons = require('./MyLessons');

exports.goToMyReports = function(){
    browser.get('/#!/user/create/reports?lergoLanguage=en&reportType=mine');
    return exports.reports;
};

exports.goToMyLessons = function(){
    browser.get('/#!/user/create/lessons');
    return exports.lessons;
};