'use strict';


exports.element = $('.go-to-my-lessons-demo-dialog');

exports.okGotIt = $click('okGotIt()');

exports.dontShowAgain = $click('dontShowAgain()');

exports.clickOkGotIt = function(){
    browser.sleep(1000);
    exports.okGotIt.click();
    return browser.sleep(1000); // fade in /out effect
};

exports.clickDontShowAgain = function(){
    browser.sleep(1000);
    exports.dontShowAgain.click();
    return browser.sleep(1000);
};
