'use strict';
//var logger = require('log4js').getLogger('RolesEdit');



exports.selectPermissions = function( permissions ){
    checkboxesByLabel( element.all(by.css('[ng-repeat="permission in permissions"]')), permissions );
};

exports.selectLanguageLimitations = function( languages ){
    checkboxesByLabel( element.all(by.css('[ng-repeat="language in options.limitEditLanguage"')), languages);
};

exports.selectSubjectLimitations = function( subjects ){
    checkboxesByLabel( element.all(by.css('[ng-repeat="subject in options.limitEditSubject"')), subjects);
};

exports.setAgeLimitation = function(min, max ){
    $m('role.limitations.manageAge.min').sendKeys(min);
    $m('role.limitations.manageAge.max').sendKeys(max);
};

/**
 *
 * @param {boolean} value
 */
exports.restrictToUnpublishedContent = function( value ){
    setCheckboxValue($m('role.limitations.editOnlyUnpublishedContent'), value);
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
