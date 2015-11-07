'use strict';

exports.route = function( username ){
    browser.get('/#!/user/' + ( username ? username : 'create') + '/profile');
};
