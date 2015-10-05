'use strict';

exports.find = function( opts ){
    if ( opts.username ){
        return element.all(by.css('td.name')).filter(function(item){
           return item.getText().then(function(username){
               return username === opts.username;
           });
        });
    }
};

exports.goToUser = function(opts){
    exports.find(opts).then(function(users){
        expect(users.length).toBe(1,'user ' + opts.name + ' must exist only one');
        var user = users[0];
        user.element(by.css('a')).click();
    });
};