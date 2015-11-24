'use strict';


module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        protractor: {
            sanity: {
                options: {
                    configFile: 'protractor.sanity.conf.js',
                    args: { suite : '<%= suite %>'}
                }
            },
            applitools: {
                options: {
                    configFile: 'protractor.applitools.conf.js'
                }
            }
        },
        protractor_webdriver: {
            start: {}
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

    grunt.registerTask('runBrowserstackLocal', function () {
        var done = this.async();
        var doneCalled = false;

        if ( process.env.BROWSERSTACK_USERNAME && process.env.BROWSERSTACK_KEY ) {
            grunt.log.ok('running browserstack local');
            var browserstackLocal = process.env.BROWSERSTACK_LOCAL || './dev/BrowserStackLocal';
            grunt.log.ok('expecting to find browserstackLocal at ' + browserstackLocal );
            var spawn = require('child_process').spawn;
            var server = spawn(( browserstackLocal ), [process.env.BROWSERSTACK_KEY]);
            server.stdout.on('data', function (data) {
                if (!doneCalled) {
                    doneCalled = true;
                    done();
                }
                console.log(data.toString());
            });
            server.stderr.on('data', function (data) {
                console.log(data.toString());
            });
            process.on('exit', function () {
                grunt.log.ok('killing browserstack local');
                server.kill();
            });
        }else{
            grunt.log.ok('no need for browserstack for this run. credentials are not set');
            done();
        }

    });

    grunt.registerTask('testMongoScript', function () {

        var done = this.async();
        var dbName = 'tmp-db-script-test';
        var dropDb = 'mongo ' + dbName + ' --eval \'db.dropDatabase()\'';
        var runScript = 'mongo ' + dbName + ' < ' + require('path').join(__dirname, 'build/vagrant/synced_folder/test_data.js');
        var taskFailed = false;

        var exec = require('child_process').exec;

        function puts(error, stdout, stderr) {
            var stdoutErr = stdout.toLowerCase().indexOf('error');
            if (!!error || !!stderr || stdoutErr >= 0) {
                if (!!error) {
                    grunt.log.error(error);
                }
                if (!!stderr) {
                    grunt.log.error(stderr);
                }
                if (stdoutErr >= 0) {
                    grunt.log.error(stdout);
                }
                taskFailed = true;
            } else {
                if (!!error) {
                    grunt.log.error(error);
                }
                if (!!stderr) {
                    grunt.log.error(stderr);
                }
                if (!!stdout) {
                    grunt.log.ok(stdout);
                }
            }
        }

        exec(runScript, function (error, stdout, stderr) {
            puts(error, stdout, stderr);
            exec(dropDb, function (error, stdout, stderr) {
                puts(error, stdout, stderr);
                if (taskFailed) {
                    grunt.fail.fatal('mongo script failed');
                }
                done();
            });
        });
    });
    grunt.registerTask('applitools', ['protractor_webdriver', 'protractor:applitools']);
    grunt.registerTask('protract', function( suite ){
        suite = suite || 'sanity';
        console.log('suite is', suite);
        grunt.config.data.suite = suite;

        console.log(grunt.template.process('<%= suite %>'));

        grunt.task.run(['runBrowserstackLocal','protractor_webdriver', 'protractor:sanity']);
    });

    grunt.registerTask('test', [
        'protract:footer',
        'protract:lessons',
        'protract:profile',
        'protract:questions',
        'protract:reports',
        'protract:roles',
        'protract:users'
    ]);

    grunt.registerTask('default', ['jshint', 'testMongoScript']); // just check code
};
