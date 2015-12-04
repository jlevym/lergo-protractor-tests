
var spec = [ 'spec/design/*.spec.js'];

if (!!process.env.LERGO_SPEC){
    spec = process.env.LERGO_SPEC.split(',');
}


exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: spec,


  capabilities: {
    //'browserName': 'chrome',
    'browserName': 'phantomjs',
    'chromeOptions': {'args': ['--disable-extensions']}
  },




    // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: process.env.LERGO_ENDPOINT || 'http://lergo.localhost.com',
  //baseUrl: 'http://realstaging.lergodev.info',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 20000
  }
};
