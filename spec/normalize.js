'use strict';

//var argv = require('minimist')(process.argv.slice(2));
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

    //browser.driver.manage().window().maximize(); // we will test smaller resolutions in the future
    console.log('vagrant-directConnect-localhost .maximize() is commented out');

    // define new matchers

    var customMatchers = {
        toBePresent: function() {
            return {
              compare: function(element) {
                var ret = {
                  pass: element.isPresent().then(function(isPresent) {
                    var pass = !!isPresent;
                    ret.message = 'Expected' + (pass ? ' NOT ' : '') + ' to be present';
                    return pass;
                  })
                };
                return ret;
              }
            };
          },

          toBeDisplayed: function() {
            return {
              compare: function(element) {
                var ret = {
                  pass: element.isDisplayed().then(function(isDisplayed) {
                    var pass = !!isDisplayed;
                    ret.message = 'Expected' + (pass ? ' NOT ' : '') + ' to be displayed';
                    return pass;
                  })
                };
                return ret;
              }
            };
          },
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

    /**
     *@name screenShotDirectory for jasmine2
     *@reason previous screenShotDirectory was good for 1.3x
     *@were to find it: https://www.npmjs.com/package/protractor-jasmine2-screenshot-reporter
     *@still needs to be implemented **/




//var fs = require('fs');

// protractor-jasmine2-screenshot-reporter
//https://www.npmjs.com/package/protractor-jasmine2-screenshot-reporter


//var Utils = {

    /**
     * @name screenShotDirectory
     * @description The directory where screenshots will be created
     * @type {String}
     */
//    screenShotDirectory: 'test/results/',

    /**
     * @name writeScreenShot
     * @description Write a screenshot string to file.
     * @param {String} data The base64-encoded string to write to file
     * @param {String} filename The name of the file to create (do not specify directory)
     */
  /*  writeScreenShot: function (data, filename) {
        var stream = fs.createWriteStream(this.screenShotDirectory + filename);

        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

};*/




 /* Automatically store a screenshot for each test.
 */
/*var counter = 0;
afterEach(function () {
    var currentSpec = jasmine.getEnv().currentSpec,
        passed = currentSpec.results().passed();

    browser.takeScreenshot().then(function (png) {
        browser.getCapabilities().then(function (capabilities) {
            var browserName = capabilities.caps_.browserName,
                passFail = (passed) ? 'pass' : 'FAIL',
                filename = argv.suite + '_' + counter + '_' + browserName + '_' + passFail + '-' + currentSpec.description.replace(/( |\/)/g,'_') + '.png';

            Utils.writeScreenShot(png, filename);
            counter++;
        });
    });
});*/


