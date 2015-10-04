'use strict';


exports.getCreatedOn = function(){
    var deferred = protractor.promise.defer();
    element(by.css('.properties [tooltip="created on"]')).getText().then(function( text ){
        deferred.fulfill(text.trim());
    });
    //browser.controlFlow().execute( deferred.promise );
    return deferred.promise;
};


exports.startLesson = function(){
    return element(by.css('.start-lesson')).click();
};

exports.previewLesson = function(){
    return element(by.css('[ng-click="preview()"]')).click();
};