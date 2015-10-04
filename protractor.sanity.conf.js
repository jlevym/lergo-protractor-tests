
var spec = [ 'spec/sanity/**/*.spec.js'];


if (!!process.env.LERGO_SPEC){
    spec = process.env.LERGO_SPEC.split(',');
}


exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: spec,


  capabilities: {
    'browserName': process.env.BROWSER_NAME || 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
  },


  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: process.env.LERGO_ENDPOINT || 'http://localhost:1616',
  //baseUrl: 'http://realstaging.lergodev.info',


  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 40000
  }
};
