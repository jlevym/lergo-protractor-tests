'use strict';

exports.reports = require('./MyReports');

exports.goToMyReports = function(){
    browser.get('/#!/user/create/reports?lergoLanguage=en&reportType=mine');
    return exports.reports;
};