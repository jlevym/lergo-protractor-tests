'use strict';


var logger = require('log4js').getLogger('MyLessons');

exports.createNewLesson = function(){
    $('.page-content-titles-actions button').click();
};

/**
 *
 * @param {object} opts
 * @param {string} opts.name
 */
exports.goToLesson = function(opts){
    logger.info('going to lesson', opts);
    element.all(by.text(opts.name, '[ng-repeat*="les in lessons"] td.name a')).first().click();/*.filter(function( item ){
        return item.getText().then(function(text){
            return text.toLowerCase() === opts.name.toLowerCase();
        })
    }).first().click();*/
};
