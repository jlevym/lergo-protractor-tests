'use strict';

var request = require('request');
var util = require('util');

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
            start: {},
            keepAlive: {
                options:{
                    keepAlive:true
                }
            }
        },
        concurrent: {
            test: [
                'protract:filter:true',
                'protract:footer:true',
                'protract:lessons:true',
                'protract:profile:true',
                'protract:questions:true',
                'protract:reports:true',
                'protract:roles:true',
                'protract:users:true']

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

    function copyDatabase( copyFrom, copyTo ){
        var execSync = require('child_process').execSync;
        var command = util.format('mongo --eval \'db.copyDatabase("%s","%s","localhost");\'',copyFrom, copyTo);
        execSync(command);

    }

    function removeDatabase( db ){
        var execSync = require('child_process').execSync;
        var command = util.format('mongo %s --eval \'db.dropDatabase();\'', db );
        execSync(command);
    }

    function createNewDatabase( db ){
        var command = util.format('mongo  %s  < %s ', db, require('path').join(__dirname, 'build/vagrant/synced_folder/test_data.js') );
        var execSync = require('child_process').execSync;
        execSync(command);
    }

    grunt.registerTask('backupDatabase', function(){
        var oldName = 'test-lergo-data';
        var newName = 'backup-test-lergo-data';
        copyDatabase(oldName, newName);
        removeDatabase(oldName);
    });
    // will move 'test-lergo-data' to 'backup-test-lergo-data' and create a new db with test-lergo-data
    //http://stackoverflow.com/a/11661591/1068746 ==> how to rename in mongo
    grunt.registerTask('resetMongoData', function(){
        var dbName = 'test-lergo-data';
        removeDatabase(dbName);
        createNewDatabase(dbName);
    });

    // will look for 'backup-test-lergo-data' and rename it to be 'test-lergo-data'
    grunt.registerTask('recoverBackup', function(){
        var oldDbName = 'test-lergo-data';
        var newDbName = 'backup-test-lergo-data';

        removeDatabase(oldDbName);
        copyDatabase(newDbName, oldDbName);
        removeDatabase(newDbName);
    });

    grunt.registerTask('testMongoScript', function () {

        var done = this.async();
        var dbName = 'tmp-db-script-test';
        var dropDb = 'mongo ' + dbName + ' --eval \'db.dropDatabase()\'';
        var runScript = 'mongo ' + dbName + ' < ' + require('path').join(__dirname, 'build/vagrant/synced_folder/test_data.js');
        var taskFailed = false;

        var exec = require('child_process').exec;

        function puts(error, stdout, stderr) {
            stdout = stdout.toLowerCase().replace(/writeErrors/ig,'').replace(/writeConcernErrors/ig,'');
            var stdoutErr = stdout.indexOf('error');
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
    grunt.registerTask('applitools', ['protractor_webdriver:start', 'protractor:applitools']);
    grunt.registerTask('protract', function( suite, skipWebdriver ){
        skipWebdriver = skipWebdriver === 'true';

        suite = suite || 'sanity';
        console.log('suite is', suite);
        grunt.config.data.suite = suite;

        console.log(grunt.template.process('<%= suite %>'));

        var tasks = [];

        if ( !skipWebdriver ){
            tasks.push('protractor_webdriver:start');
        }

        tasks.push('protractor:sanity');
        grunt.task.run(tasks);
        //grunt.task.run(['runBrowserstackLocal','protractor_webdriver', 'protractor:sanity']);
    });

    grunt.registerTask('stop_webdriver', function(){
        var done = this.async();
        var execSync = require('child_process').execSync;
       /* var command = 'kill -9 `jps | grep selenium | awk \'{print $1}\'`';
        execSync(command);*/
        request({url: 'http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer'}, function (err, data) {
            console.log(err);
            console.log(data);
            done();
        });
    });

    grunt.registerTask('concurrentTest', ['protractor_webdriver:keepAlive', 'concurrent:test', 'stop_webdriver']);
    grunt.registerTask('directTest', [
        'protract:filter:true',
        'protract:footer:true',
        'protract:invites:true',
        'protract:lessons:true',
        'protract:profile:true',
        'protract:questions:true',
        'protract:reports:true',
        'protract:roles:true',
        'protract:users:true',
    ]);
    grunt.registerTask('test', function (skipWebdriver) {
        var tasks = [
            'protractor_webdriver:keepAlive',
            'protract:filter:true',
            'protract:footer:true',
            'protract:invites:true',
            'protract:lessons:true',
            'protract:profile:true',
            'protract:questions:true',
            'protract:reports:true',
            'protract:roles:true',
            'protract:users:true',
            'stop_webdriver'
        ];
        if (skipWebdriver === 'true') {
            tasks.splice(0, 1);
            tasks.splice(-1, 1);
        }
        grunt.task.run(tasks);
    });
    // grunt.registerTask('test', [
    //     'protractor_webdriver:keepAlive',
    //     'protract:filter:true',
    //     'protract:footer:true',
    //     'protract:invites:true',
    //     'protract:lessons:true',
    //     'protract:profile:true',
    //     'protract:questions:true',
    //     'protract:reports:true',
    //     'protract:roles:true',
    //     'protract:users:true',
    //     'stop_webdriver'
    // ]);

    grunt.registerTask('default', ['jshint', 'testMongoScript']); // just check code
};
