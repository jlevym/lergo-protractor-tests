'use strict';

//
//var logger = require('log4js').getLogger('RolesIndex');

exports.createNewRole = function(){
    $click('create()').click();
};

exports.find = function(opts){
    if ( opts.name ) {
        return element.all(by.text(opts.name,'td.name'));/*.filter(function (item) {
            return item.getText().then(function (text) {
                var result = opts.name.toLowerCase().trim() === text.toLowerCase().trim();
                return result;
            });
        });*/
    }
};
