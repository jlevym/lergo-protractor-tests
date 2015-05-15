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


    grunt.registerTask('applitools', [ 'protractor_webdriver','protractor:applitools']);
    grunt.registerTask('protract',[ 'protractor_webdriver','protractor:sanity']); // run protractor test
    grunt.registerTask('default',[ 'jshint' ]); // just check code
};