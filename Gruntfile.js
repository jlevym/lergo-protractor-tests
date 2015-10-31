'use strict';


module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        protractor:{
            sanity:{
                options: {
                    configFile:'protractor.sanity.conf.js'
                }
            },
            applitools: {
                options: {
                    configFile: 'protractor.applitools.conf.js'
                }
            }
        },
        protractor_webdriver:{
            start:{

            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: {
                    'src': [
                        'Gruntfile.js',
                        'spec/**/*.js',
                        'source/**/*.js',
                        '!node_modules'
                    ]
                }
            }

        }
    });


    grunt.registerTask('testMongoScript', function(){

        var done = this.async();
        var dbName = 'tmp-db-script-test';
        var dropDb = 'mongo ' + dbName + ' --eval \'db.dropDatabase()\'';
        var runScript = 'mongo ' + dbName + ' < ' + require('path').join(__dirname,'build/vagrant/synced_folder/test_data.js');
        var taskFailed = false;

        var exec = require('child_process').exec;

        function puts(error, stdout, stderr) {
            var stdoutErr = stdout.toLowerCase().indexOf('error');
            if ( !!error || !!stderr || stdoutErr >=0 ){
                if ( !!error ){
                    grunt.log.error(error);
                }
                if ( !!stderr ){
                    grunt.log.error(stderr);
                }
                if ( stdoutErr >= 0 ){
                    grunt.log.error(stdout);
                }
                taskFailed = true;
            }else {
                if ( !!error ) { grunt.log.error(error); }
                if ( !!stderr) { grunt.log.error(stderr); }
                if ( !!stdout) { grunt.log.ok(stdout); }
            }
        }
        exec(runScript, function( error, stdout, stderr ){
            puts(error,stdout, stderr);
            exec(dropDb, function(error,stdout,stderr){
                puts(error,stdout, stderr);
                if ( taskFailed ){
                    grunt.fail.fatal('mongo script failed' );
                }
                done();
            });
        });
    });
    grunt.registerTask('applitools', [ 'protractor_webdriver','protractor:applitools']);
    grunt.registerTask('protract',[ 'protractor_webdriver','protractor:sanity']); // run protractor test
    grunt.registerTask('default',[ 'jshint', 'testMongoScript' ]); // just check code
};
