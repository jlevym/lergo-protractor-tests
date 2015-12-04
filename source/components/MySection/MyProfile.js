'use strict';

var logger = browser.getLogger('MyProfile');

exports.route = function( username ){
    browser.get('/#!/' + ( username ? ('public/' + username) : 'user/create') + '/profile');
    //browser.sleep(1000);
};


exports.getUsername = function(){
    return $('.profile-username').getText();
};

exports.clickLessonsCreated = function(){
    return $('[lergo-user-profile]').element(by.text('a','Lessons Created')).click();
};

exports.clickQuestionsCreated = function(){
    return $('[lergo-user-profile]').element(by.text('questions created','a,button')).click();
};

exports.isStatsDisplayed = function(){
    return $('.profile-stats').getText().then(function( text ){
        return text.trim() === '';
    });
};

exports.getPopoverText = function(){
    return $('.popover').getText();
};

exports.getExternalLink = function(){
    return $('.profile-external-link');
};

exports.getIntro = function(){
    return $('.profile-intro');
};

exports.toggleEdit = function(){
    $('[ng-click="toggleEdit()"]').click();
};

exports.isEditMode = function(){
    return $('.fa.fa-edit').isDisplayed();
};

exports.setExternalLink = function(externalLink){
    $m('user.externalLink').clear().sendKeys(externalLink);
};

exports.setIntro = function(intro){
    $m('user.shortIntro').clear().sendKeys(intro);
};

exports.setDetails = function(details){
    $m('user.details').clear().sendKeys(details);
};


/**
 *
 * @param {object} opts
 * @param {string} opts.externalLink
 * @param {string} opts.intro
 * @param {string} opts.details
 */
exports.editDetailsAndSave = function( opts ){
    exports.toggleEdit();
    if ( opts.externalLink ){
        exports.setExternalLink(opts.externalLink);
    }
    if ( opts.intro){
        exports.setIntro(opts.intro);
    }
    if ( opts.details ){
        exports.setDetails(opts.details);
    }
    exports.toggleEdit();
};




exports.getDetails = function(){
    return $('.profile-details');
};

/**
 *
 * @returns {promise} which resolves object { 'intro', 'details' , 'externalLink' } values
 */
exports.getProfileData = function () {
    return protractor.promise.all(
        [
            exports.getIntro().getText(),
            exports.getDetails().getText(),
            exports.getExternalLink().getText()
        ]
    ).then(function (details) {
            return {
                'intro': details[0].trim(),
                'details': details[1].trim(),
                'externalLink': details[2].trim()

            };
        });

};

exports.getProfileStats = function(){
    return $('.profile-stats').getText().then(function(text){
        text = text.replace(/\n+/g, ' '); // will get "1 question 2 lessons"
        logger.info('got profile stats text [' +  text + ']');
        var args = text.split(' ');
        logger.info('stats args are' + args);
        return {
            questionsCount: parseInt(args[0],10),
            lessonsCount: parseInt(args[2],10)
        };
    });
};

