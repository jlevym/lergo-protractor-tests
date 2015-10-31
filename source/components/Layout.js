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

exports.getNavigationItem = function(section, required ){
    logger.info('getting navigation item', section, required);
    hoverOnProfile();
    var sections = $('.header-login .dropdown-menu').all(by.text(section,'li a'));
    logger.info('this is count', typeof(sections.count));
    if ( required ) {
        expect(sections.count()).toBe(1, 'section should exit [' + section + ']');
    }
    return sections.first();
    /*.then(function(elems) {
        if ( !!required ) {
            expect(elems.length).toBe(1, 'user section [' + section + '] should exist');
        }
        return elems.length === 0 ? undefined : elems[0] ;
    });*/
};


exports.goToUserSection = function( section ){
    if ( !section ) {
        return $('.header-login>a').click();
    }else{
        return exports.getNavigationItem(section, true ).click();
    }
};

exports.NAV_ITEMS = {
    MANAGE_ROLES: 'manage roles',
    MANAGE_USERS: 'manage users',
    MANAGE_LESSONS: 'manage lessons',
    MANAGE_ABUSE_REPORTS: 'manage abuse reports'
};




exports.goToManageRoles = function(){
    exports.goToUserSection( exports.NAV_ITEMS.MANAGE_ROLES );
};

exports.goToManageUsers = function(){
    exports.goToUserSection( exports.NAV_ITEMS.MANAGE_USERS );
};

exports.goToManageLessons = function(){
    exports.goToUserSection( exports.NAV_ITEMS.MANAGE_LESSONS );
};

exports.goToManageAbuseReports = function(){
    exports.goToUserSection( exports.NAV_ITEMS.MANAGE_ABUSE_REPORTS );
};

exports.footer = {
    FOOTER_LINKS: {
        ABOUT_LERGO: 'about lergo'
    },
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
