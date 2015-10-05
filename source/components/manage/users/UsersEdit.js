'use strict';

exports.editUserRoles = function(){
    $click('editUserRoles()').click();
};


exports.getRoles = function(){
    return element.all(by.css('ul.roles li'));
};

exports.openEditRoles = function(){
    $click('editUserRoles()').click();
};

exports.editRolesDialog = {

    selectRoles: function( roles ){
        checkboxesByLabel( element.all(by.css('.modal-dialog [ng-repeat]')), roles );
    },

    submit: function(){
        $('.modal-dialog [ng-click="submit()"]').click();
    },

    close: function(){
        $('.modal-dialog [ng-click="close()"]').click();
    }


};