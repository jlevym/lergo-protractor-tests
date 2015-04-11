'use strict';


module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        protractor:{
            all:{
                options: {
                    configFile:'protractor.conf.js'
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


    grunt.registerTask('default',[ 'jshint', 'protractor_webdriver','protractor']);
};