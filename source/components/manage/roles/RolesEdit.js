'use strict';
//var logger = require('log4js').getLogger('RolesEdit');



exports.selectPermissions = function( permissions ){
    checkboxesByLabel( element.all(by.css('.permissions>div')), permissions );
};

/**
 * @param {object} details
 * @param {string} details.name
 * @param {string} details.description
 * @param {object} details.permissions in the form of { permissionName : boolean }
 * @param {boolean} details.permission
 */
exports.setDetails = function( details ){

    if ( details.name ) {
        $m('role.name').clear().sendKeys(details.name);
    }

    if ( details.description ){
        $m('role.description').clear().sendKeys(details.description);
    }

    if ( details.permissions ){
        exports.selectPermissions(details.permissions);
    }
};

exports.apply = function(){
    $click('saveRole(false)').click();
};

exports.save = function(){
    $click('saveRole(true)').click();
};

exports.delete = function(){
    $click('deleteRole()').click();
};

exports.close = function(){
    $click('cancel()').click();
};