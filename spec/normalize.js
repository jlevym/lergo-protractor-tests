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

    browser.driver.manage().window().maximize(); // we will test smaller resolutions in the future

    // define new matchers

    var toBePresent = {
        toBePresent: function (msg) {
            var me  = this;
            return this.actual.isPresent().then(function () {
                return true;
            }, function (e) {
                me.message = function(){
                    return msg || ( 'element not present. error is :: ' + e.toString() );
                };
                return false;
            });
        }

    };

    // guy - it seems that there is something weird between running protractor from grunt and from cli.
    // supporting both scenarios fixes it.
    if ( typeof(jasmine.addMatchers) === 'function' ){
        jasmine.addMatchers(toBePresent);
    }else if ( typeof( this.addMatchers) === 'function' ){
        this.addMatchers(toBePresent);
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


