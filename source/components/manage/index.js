'use strict';

exports.roles=require('./roles');
exports.users=require('./users');
exports.lessons = require('./lessons');

//var logger = require('log4js').getLogger('manage.index');

exports.TAB = {
    MANAGE_USERS: 'users',
    MANAGE_LESSONS: 'lessons',
    MANAGE_ABUSE_REPORTS: 'flagged lesson reports',
    MANAGE_ROLES: 'roles'
};

exports.getNavTab = $label_gen($r('section in sections'));


