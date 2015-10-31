'use strict';


//var logger = require('log4js').getLogger('normalize');
var chalk = require('chalk');
chalk.enabled = true;

beforeEach(function(){
    console.log( chalk.bold.blue('currently running :: ' +   jasmine.getEnv().currentSpec.getFullName()));


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


