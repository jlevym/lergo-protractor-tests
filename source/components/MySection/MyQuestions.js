'use strict';

var logger = browser.getLogger('MyQuestions.js');


exports.createNewQuestion = function(){
    $click('createQuestionBtnDisable || createNewQuestion()').click();
};

/**
 *
 * @param {object} opts
 * @param {string} opts.question
 * @param {number} opts.index
 */
exports.goToQuestion = function(opts){
    logger.info('going to lesson', opts);

    var lergoFilter = require('../LergoFilter');
    lergoFilter.resetIfDisplayed();
    lergoFilter.setText(opts.question);

    if ( opts.question ) {
        element.all(by.text(opts.question, 'td.question a span')).first().click();
    }

    if ( typeof(opts.index) === 'number' ){
        logger.info('getting question by index', opts);
        $$('[ng-repeat*="item in items"] td.question a').get(opts.index).click();
    }

};


exports.filterIsActiveNotification = require('../common').filterIsActiveNotification;
