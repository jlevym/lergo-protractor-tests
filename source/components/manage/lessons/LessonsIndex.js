'use strict';

exports.TABLE_ACTIONS = {
    DELETE_LESSON: 'delete',
    PUBLISH_LESSON: 'publish',
    UNPUBLISH_LESSON: 'unpublish'
};

exports.getTableAction = require('../../common/IndexTable').getTableAction;
