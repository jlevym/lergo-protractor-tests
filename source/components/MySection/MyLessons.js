'use strict';


var logger = browser.getLogger('MyLessons');

exports.createNewLesson = function(){
    $('.page-content-titles-actions button').click();
};

/**
 *
 * @param {object} opts
 * @param {string} opts.name
 * @param {number} opts.index
 */
exports.goToLesson = function(opts){
    logger.info('going to lesson', opts);
    if ( opts.name ) {
        element.all(by.text(opts.name, '[ng-repeat*="les in lessons"] td.name a')).first().click();
    }

    if ( typeof(opts.index) === 'number' ){
        logger.info('getting lesson by index', opts);
        $$('[ng-repeat*="les in lessons"] td.name a').get(opts.index).click();
    }

    /*.filter(function( item ){

        return item.getText().then(function(text){
            return text.toLowerCase() === opts.name.toLowerCase();
        })
    }).first().click();*/
};
