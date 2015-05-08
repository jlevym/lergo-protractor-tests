'use strict';

var _ = require('lodash');

exports.setDetails = function( details ){
    _.each(details, function(value,key){
        var setter = 'set' + _.capitalize(key);
        if ( exports.hasOwnProperty( setter )){
            exports[setter](value);
        }
    });
};

exports.setName = function( name ){
    return element(by.model('lesson.name')).sendKeys(name);

    //element(by.model('lesson.subject')).sendKeys('test lesson description');
    //element(by.model('lesson.age')).sendKeys('test lesson description');
    //element(by.model('lesson.tags')).sendKeys('test lesson description');
};

exports.setDescription = function(description){
    return element(by.model('lesson.description')).sendKeys(description);
};

exports.setLanguage = function( language ){
    return selectOptionByText($m('lesson.language'), language );
};


exports.setAge = function( age ){
    return $m('lesson.age').sendKeys(age);
};

exports.setSubject = function( subject ){
    return selectOptionByText($m('lesson.subject'), subject);
};

exports.setTags = function( tag ){
    $m('newTag').sendKeys(tag);
    return enter();
};

exports.clickDone = function(){
    return $('[ng-click="done()"]').click();
};
