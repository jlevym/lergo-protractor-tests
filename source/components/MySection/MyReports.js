'use strict';


exports.goToFirstReport = function(){
    var deferred = protractor.promise.defer;
    element.all(by.repeater('report in reports')).then(function( lessons ){
        lessons[0].element(by.css('a')).click().then(deferred.fulfill);
    });
    return deferred.promise;
};

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