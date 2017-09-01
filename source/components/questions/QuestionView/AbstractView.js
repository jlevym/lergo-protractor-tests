'use strict';

function Viewer(){}


// available in preview question
Viewer.prototype.getUserLink = function(){
    return $('[uib-tooltip="by"] a');
};

Viewer.prototype.getQuestion = function(){
    return element(by.css('.question')).getText();
};

Viewer.prototype.clickHint = function(){
    return $('.hint button').click();
};

Viewer.prototype.submit = function(){
    return $('.submit').element(by.text('submit','button')).click();
};

Viewer.prototype.letsContinue = function(){
    return $('.submit').element(by.text('ok! let\'s continue','button')).click();
};

Viewer.prototype.continue = function(){
    return $('.submit').element(by.text('continue','button')).click();
};

Viewer.prototype.countButtons = function(){
    return $$('.submit button').filter(function(e){ return e.isDisplayed(); }).count();
};

Viewer.prototype.getHintText = function(){
    return $('.hint .popover').getText();
};

Viewer.prototype.getExplanation = function(){
    return $('[ng-show="shouldShowExplanationMessage()"] div').getText();
};

Viewer.prototype.answer = function(){
    throw new Error('function not implemented for this type');
};

Viewer.prototype.explanation = function(){
    return $('.quiz-item-explanation');
};


module.exports = Viewer;
