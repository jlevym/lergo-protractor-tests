'use strict';

var logger  = browser.getLogger('LessonsIndex.js');

exports.TABLE_ACTIONS = {
    DELETE_LESSON: 'delete',
    PUBLISH_LESSON: 'publish',
    UNPUBLISH_LESSON: 'unpublish'
};

exports.getTableAction = require('../../common/IndexTable').getTableAction;
exports.table = require('../../common/IndexTable');

exports.countLessons = function(){
    return $$('[ng-repeater="l in lessons"]').count();
};


exports.filterLessons = function(opts){
    if ( opts.searchText || opts.name){
        $m('model.searchText').clear();
        $m('model.searchText').sendKeys(opts.searchText || opts.name);
    }
};
/**
 *
 * @param {object} opts
 * @param {string} opts.name
 * @param {number} opts.index
 */
exports.goToLesson = function(opts){
    if ( typeof(opts.index) === 'number' ){
        logger.info('getting lesson by index', opts);
        $$('[ng-repeat*="l in lessons"] td.name a').get(opts.index).click();
    }

    if ( typeof(opts.name) === 'string' ){
        exports.filterLessons(opts);
        $$('[ng-repeat*="l in lessons"] td.name a').get(0).click();
    }
};
