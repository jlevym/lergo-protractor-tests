'use strict';


exports.goToFirstReport = function(){
    var deferred = protractor.promise.defer;
    element.all(by.repeater('report in reports')).then(function( lessons ){
        lessons[0].element(by.css('a')).click().then(deferred.fulfill);
    });
    return deferred.promise;
};