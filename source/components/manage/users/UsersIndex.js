'use strict';

exports.find = function( opts ){
    if ( opts.username ){
        return element.all(by.text( opts.username, 'td.name'));/*.filter(function(item){
           return item.getText().then(function(username){
               return username === opts.username;
           });
        });*/
    }
};

exports.countUsers = function(){
    return $$('tr[ng-repeat^="user in users"]').count();
};

exports.goToUser = function(opts){
    exports.find(opts).then(function(users){
        expect(users.length).toBe(1,'user ' + opts.name + ' must exist only one');
        var user = users[0];
        user.element(by.css('a')).click();
    });
};
