'use strict';

var indexTable = require('../common/IndexTable');
var _ = require('lodash');

exports.getFirstReport = function(){
    return element.all(by.repeater('report in reports')).first();
};

exports.goToFirstReport = function(){
    exports.getFirstReport().$('a').click();
};

exports.selectFirstReport = function(){
    exports.getFirstReport().$('input').click();
};

exports.tableToJson = indexTable.tableToJson_gen('table');

exports.TABLE_ACTIONS = {
    DELETE_REPORT: 'delete',
    CREATE_QUIZ_FROM_INCORRECT_ANSWERS: 'create quiz from incorrect answers'
};

exports.TABLE_COLUMN = {
    TAKEN_AT: 'Taken at'
};

_.each(exports.TABLE_COLUMN, function( value, key){
    exports.TABLE_COLUMN[key] = value.toLowerCase();
});

exports.getTableAction = indexTable.getTableAction;

var LESSON_TYPE={
    byMe:'Lessons done by me',
    byStudents:'Lesson done by students'
};


exports.seeLessonsDoneByMe = function(){
    selectOptionByText($m('reportsPage.reportType'),LESSON_TYPE.byMe);
};

exports.seeLessonsDoneByStudents = function(){
    selectOptionByText($m('reportsPage.reportType'),LESSON_TYPE.byStudents);
};


exports.filterIsActiveNotification = require('../common').filterIsActiveNotification;
