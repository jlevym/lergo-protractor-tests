'use strict';

exports.goToMySection = function(){
    return element(by.css('[gravatar-size]')).click();
};

exports.searchLesson = function( name ){
    element(by.model('baseLayout.filterTextSearch')).sendKeys(name);
    return element(by.css('.header-search .icon-search')).click();
};

exports.logout = function(){
    return $('[ng-click="logout()"]').click();
};


exports.goToUserSection = function(){
    return $('.header-login a').click();
};