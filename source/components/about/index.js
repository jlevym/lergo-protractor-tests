'use strict';


exports.faq = require('./faq');

exports.getSections = function(){
    return $r('section in sections');
};

exports.getSection = $label_gen($r('section in sections'));

exports.goToSection = function( label ){
    return exports.getSection(label,true).click();
};

exports.SECTIONS = {
    OVERVIEW: 'overview',
    CONTRIBUTE: 'contribute',
    KEY_CONTRIBUTORS: 'key contributors',
    KEY_FUNDERS_LIST: 'key funders list',
    FUNDERS_PICTURE_COLLAGE: 'funders pictures collage',
    FRIENDS: 'friends',
    FAQ: 'faq',
    PRIVACY_AND_TERMS: 'privacy & terms',
    CONTACT: 'contact'
};
