'use strict';


if ( !process.env.APPLITOOLS_KEY){
    throw new Error('need to initialize APPLITOOLS_KEY');
}

var Eyes = require('eyes.protractor').Eyes;
//var MatchSettings = require('eyes.protractor').ImageMatchSettings;
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_KEY);

describe('lergo homepage', function() {
    it('should lessons', function() {
        eyes.open(browser, 'Angular App', 'Simple Protractor Test', {width: 1200, height: 1200});
        browser.get('http://realstaging.lergodev.info');
        //browser.get('http://juliemr.github.io/protractor-demo/');
        eyes.checkWindow('Homepage');
        //element(by.model('first')).sendKeys(1);
        //element(by.model('second')).sendKeys(2);
        //eyes.checkWindow('Input Ready');
        //element(by.id('gobutton')).click();
        //eyes.checkWindow('Result');
        //
        //expect(element(by.binding('latest')).getText()).
        //    toEqual('3');

        eyes.close();
    });
});
