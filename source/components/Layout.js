'use strict';

var logger = require('log4js').getLogger('Layout');


function hoverOnProfile(){
    var img = $('img[gravatar-src]');
    element.all(by.css('.toast')).click();
    browser.wait(function(){
        return img.isDisplayed();
    }, 40000);
    // https://github.com/angular/protractor/issues/159
    browser.actions().mouseMove( img ).perform();
}


exports.goToMySection = function(){
    return element(by.css('[gravatar-size]')).click();
};

exports.searchLesson = function( name ){
    var searchBar = element(by.model('baseLayout.filterTextSearch'));
    searchBar.clear();
    searchBar.sendKeys(name);
    return element(by.css('.header-search .icon-search')).click();
};

exports.logout = function(){
    hoverOnProfile();
    browser.sleep(2000);
    return $click('logout()').click();
};


exports.goToUserSection = function( section ){
    if ( !section ) {
        return $('.header-login>a').click();
    }else{
        hoverOnProfile();

        logger.info('getting user section [' + section + ']');
        return element.all(by.css('.header-login .dropdown-menu li a')).filter(function(elem){
            return elem.getText().then(function( text){
                return text.toLowerCase().trim() === section.toLowerCase().trim();
            });
        }).then(function(elems){
            expect(element.length).toBe(1, 'user section [' + section + '] should exist');
            elems[0].click();
        });
    }
};




exports.goToManageRoles = function(){
    exports.goToUserSection('manage roles');
};

exports.goToManageUsers = function(){
    exports.goToUserSection('manage users');
};

exports.goToManageLessons = function(){
    exports.goToUserSection('manage lessons');
};

exports.footer = {
    links : {
        /**
         * about lergo
         * @param name
         */
        goTo: function( name ){
            logger.debug('footer links clicking on [', name , ']');
            return element.all(by.css('.footer-links li a')).filter(function(elem){
                return  elem.getText().then(function( text ){
                    return text.toLowerCase().trim() === name.trim();
                });
            }).then(function( elems ){
                elems[0].click();
            });
        }
    }
};
