'use strict';
//var logger = require('log4js').getLogger('my_reporter');

var myReporter = {

    jasmineStarted: function(suiteInfo){
        console.log('Running suite with ' + JSON.stringify(suiteInfo));
    },

    suiteStarted: function(result){
        console.log('suite started: ' + JSON.stringify(result));
    },

    specStarted: function(result){
        console.log('spec started:' + JSON.stringify(result));
    }



};


jasmine.getEnv().addReporter(myReporter);
