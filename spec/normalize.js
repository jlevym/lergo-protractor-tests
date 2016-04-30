'use strict';

process.env.NODE_PATH = 'source';
require('module').Module._initPaths();

require('./my_reporter');

//var logger = require('log4js').getLogger('normalize');
var chalk = require('chalk');
chalk.enabled = true;


// todo: consider using clear for local storage and session storage for all tests..
//beforeEach(function(){
//   browser.executeScript(function(){
//       localStorage.clear();
//       sessionStorage.clear();
//   });
//});

beforeEach(function(){

    if (jasmine.version) { //the case for version 2.0.0
        console.log('jasmine-version:' + jasmine.version);
    }
    else { //the case for version 1.3
        console.log('jasmine-version:' + jasmine.getEnv().versionString());
    }

    browser.driver.manage().window().maximize(); // we will test smaller resolutions in the future

    // define new matchers

    var customMatchers = {
        toBePresent: function (msg) {
            var me  = this;
            console.log(this);
            return this.actual.isPresent().then(function () {
                if ( me.isNot ){
                    throw new Error('element is present');
                }else{
                    return true;
                }
            }, function (e) {
                if ( me.isNot ){
                    return false;
                }else {
                    throw new Error(msg || ( 'element not present. error is :: ' + e.toString() ));
                }

            });
        },

        toBeDisplayed: function(msg){
            var me = this;
            return this.actual.isDisplayed().then(function(isDisplayed){
                if ( !isDisplayed ){
                    if ( me.isNot ){
                        return false;
                    }else{
                        throw new Error('element is not displayed but should be :: ' + msg);
                    }
                } else {
                    if ( me.isNot ){
                        throw new Error('element is displayed but should not :: ' + msg);
                    }else{
                        return true;
                    }
                }

            }, function(e){
                throw new Error(msg || ('element not displayed. error is :: ' + e.toString() ));
            });
        }
    };

    function addMatchers( jas ){
        jas.addMatchers(customMatchers);
    }

    // guy - it seems that there is something weird between running protractor from grunt and from cli.
    // supporting both scenarios fixes it.
    if ( typeof(jasmine.addMatchers) === 'function' ){
        addMatchers(jasmine);
    }else if ( typeof( this.addMatchers) === 'function' ){
        addMatchers(this);
    }


});


browser.getLogger = function(name){

    var logger = require('log4js').getLogger(name);

    function logMe ( level ){
        return function(msg){

            try {
                browser.sleep(1).then(function () {
                    try {
                        logger[level](msg);
                    }catch(e){
                        console.log(e);
                    }
                });

            }catch(e){
                console.log(e);
            }
        };
    }

    return {
        info : logMe('info'),
        warn : logMe('warn'),
        error : logMe('error'),
        debug : logMe('debug'),
        trace : logMe('trace')
    };
};


