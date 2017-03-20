var logger = require('log4js').getLogger('protractor.sanity.conf');
var spec = [  'spec/sanity/**/*.spec.js'];

var _ = require('lodash');
//try to increase timeout
getPageTimeout:50000;

if (!!process.env.LERGO_SPEC){
    spec = process.env.LERGO_SPEC.split(',');
}

spec = ['spec/normalize.js'].concat(spec);

//console.log('spec is', spec);


var browserName = process.env.BROWSER_NAME || process.env.BROWSER_TYPE || 'chrome';
var restartBrowser = true;
var capabilities = { browserName : browserName };

if ( browserName === 'chrome'){
    _.merge(capabilities, { 'chromeOptions': {'args': ['--disable-extensions']} });
}

if ( browserName === 'phantomjs'){
    _.merge(capabilities,{});
}


if ( browserName === 'browserstack-chrome' || browserName === 'browserstack_chrome'){

    restartBrowser = false;
    if ( !process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_KEY ){
        logger.error('browserstack credentials are missing');
        process.exit(1);
    }

    logger.info('running browserstack on [' + process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_KEY + ']');

    // Input capabilities
    _.merge(capabilities, {
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_KEY,
        'browserName': 'Chrome',
        'browser_version': '46.0',
        'browserstack.local' : 'true',
        'os': 'Windows',
        'os_version': '10',
        'resolution': '1920x1080'
    });
}


seleniumAddress = browserName.indexOf('browserstack') >= 0 ? 'http://hub.browserstack.com/wd/hub' : 'http://localhost:4444/wd/hub';

exports.config = {
    // The address of a running selenium server.
    seleniumAddress: seleniumAddress,

    'framework' : 'jasmine',

    // Spec patterns are relative to the location of this config.
    capabilities: capabilities,

    //restartBrowserBetweenTests: restartBrowser,

    suites: {
        footer: ['spec/normalize.js', 'spec/sanity/footer/**/*.spec.js'],
        lessons: ['spec/normalize.js', 'spec/sanity/lessons/**/*.spec.js'],
        profile: ['spec/normalize.js', 'spec/sanity/profile/**/*.spec.js'],
        questions: ['spec/normalize.js', 'spec/sanity/questions/**/*.spec.js'],
        reports: ['spec/normalize.js', 'spec/sanity/reports/**/*.spec.js'],
        roles: ['spec/normalize.js', 'spec/sanity/roles/**/*.spec.js'],
        users: ['spec/normalize.js', 'spec/sanity/users/**/*.spec.js'],
        sanity: [ 'spec/normalize.js', 'spec/sanity/lessons/**/*.spec.js' ],
        filter: [ 'spec/normalize.js', 'spec/sanity/filter/**/*.spec.js' ],
        invites: [ 'spec/normalize.js', 'spec/sanity/invites/**/*.spec.js' ],
        custom: [ 'spec/normalize.js', process.env.LERGO_SPEC ]
    },


    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    //baseUrl: process.env.PROTRACTOR_ENDPOINT || process.env.LERGO_ENDPOINT || 'http://localhost:1616',
    //baseUrl: 'http://realstaging.lergodev.info',
    baseUrl: PROTRACTOR_ENDPOINT="http://localhost:9000",


    jasmineNodeOpts: {
        onComplete: null,
        realtimeFailure: true,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 360000 // using browserstack tests will be slow.. give them 6 minutes timeout
    }
};
