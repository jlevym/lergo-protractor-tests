'use strict';

var logger = require('log4js').getLogger('Layout');

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