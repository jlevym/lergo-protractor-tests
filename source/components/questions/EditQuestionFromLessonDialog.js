'use strict';

// when we edit a question from lesson, this is the dialog we open


exports.getCopyAndOverrideMessage = function(){
    return $('.modal-content [ng-show="!!isUpdate"] [ng-show="!!canCopyAndOverride()"]');
};

exports.close = function(){
    $('.modal-content [ng-click="cancel(quizItem)"]').click();
    browser.sleep(3000);
};
