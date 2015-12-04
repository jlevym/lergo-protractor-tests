'use strict';

function Viewer(){}


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

Viewer.prototype.getHintText = function(){
    return $('.hint .popover').getText();
};

Viewer.prototype.getExplanation = function(){
    return $('[ng-show="!!quizItem.explanation"] div').getText();
};

Viewer.prototype.answer = function(){
    throw new Error('function not implemented for this type');
};


module.exports = Viewer;
