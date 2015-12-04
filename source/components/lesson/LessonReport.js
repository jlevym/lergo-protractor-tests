'use strict';

var request = require('request');

exports.continueLesson = function(){
    element(by.css('.continue-lesson')).click();
};

/**
 * @return reportId from report url as a promise
 */
exports.getIdFromUrl = function(){
    var deferred = protractor.promise.defer();
    browser.getCurrentUrl().then(function(url){
        deferred.fulfill(url.match(new RegExp('lessons/reports/(.+)/display'))[1]);
    });
    return deferred.promise;
};

/**
 * returns report as is from the backend
 */
exports.get = function( opts ){
    function _impl() {
        var deferred = protractor.promise.defer();
        var reportUrl = require('url').resolve(browser.baseUrl ,'/backend/reports/' + opts.reportId + '/read');
        request({ 'url' : reportUrl, json:true}, function (err, result, body) {
            deferred.fulfill(body);
        });
        return deferred.promise;
    }
    return browser.controlFlow().execute(_impl);
};
