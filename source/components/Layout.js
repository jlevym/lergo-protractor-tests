'use strict';

exports.goToMySection = function(){
    return element(by.css('[gravatar-size]')).click();
};

exports.searchLesson = function( name ){
    element(by.model('baseLayout.filterTextSearch')).sendKeys(name);
    return element(by.css('.header-search .icon-search')).click();
};