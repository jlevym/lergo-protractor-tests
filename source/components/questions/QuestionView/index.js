'use strict';

var logger = require('log4js').getLogger('QuestionEditor.index');

exports.multichoice = require('./MultichoiceView');

/**
 *
 * @param {LERGO_QUESTION_TYPE} type
 */
exports.getByType = function( type ){
    type = type.id;
    if ( !exports[type] ){
        var e = new Error('type [' + type + '] is not supported');
        logger.error('unable to instantiate question editor', e);
        throw e;
    }
    return exports[type];
};