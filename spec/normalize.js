'use strict';

process.env.NODE_PATH = 'source';

require('module').Module._initPaths();


//var logger = require('log4js').getLogger('normalize');
var chalk = require('chalk');
chalk.enabled = true;

beforeEach(function(){
    console.log( chalk.bold.blue('currently running :: ' +   jasmine.getEnv().currentSpec.getFullName()));

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

    this.addMatchers(toBePresent);

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


