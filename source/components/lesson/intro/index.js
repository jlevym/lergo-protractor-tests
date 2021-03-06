'use strict';


exports.getCreatedOn = function(){
    var deferred = protractor.promise.defer();
    element(by.css('.properties [uib-tooltip="created on"]')).getText().then(function( text ){
        deferred.fulfill(text.trim());
    });
    //browser.controlFlow().execute( deferred.promise );
    return deferred.promise;
};

exports.editLesson = function(){
    return $('[uib-tooltip="Edit Lesson"]').click();
};

exports.getEditButton = function(){
    return $('[uib-tooltip="Edit Lesson"]');
};

exports.startLesson = function(){
    return element(by.css('.start-lesson')).click();
};

exports.previewLesson = function(){
    return element(by.css('[ng-click="previewLesson()"]')).click();
};


exports.isShowingMore = function(){
    return element.all(by.css('[ng-show="!!more"].ng-hide')).count().then(function(count){
        return count === 0;
    });
};

exports.getEditSummaryText = function(){
    return $('.edit-summary').getText();
};

exports.descriptionReadMore = function(desired){
    exports.isShowingMore().then(function(current){
        if ( current !== desired ){
            $('.read-more').click();
        }
    });
};


exports.invite = require('./LessonIntroInvite');
exports.classInvite = require('./ClassInvite');
