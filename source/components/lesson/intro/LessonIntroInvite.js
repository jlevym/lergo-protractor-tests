'use strict';

var logger = browser.getLogger('LessonIntroInvite');

/**
 * @typedef {object} LessonIntroInviteMode
 * @type LessonIntroInviteMode
 */
exports.Modes = {
    STUDENT: 'invite student',
    CLASS: 'invite class'
};

class InvitePanel{

    constructor( mode ){
        this.mode = mode;
    }

    setName( name ){
        if ( this.mode === exports.Modes.CLASS ){
            return $('.invite .active [ng-model="invitationName"]').clear().sendKeys(name);
        }else{ // student
            return $('.invite .active [ng-model="invite.invitee.name"]').clear().sendKeys(name);

        }
    }

    submit(){
        $('.invite .active [ng-click="sendInvite()"]').click();
        logger.info('sent invite');
        return browser.sleep(1000);
    }

    getLink(){
        return  $('.invite .active .link').getAttribute('value');
    }

    newInvite(){
        $click('newInvite()').click();
    }

}

/**
 *
 * @param {LessonIntroInviteMode} mode
 */
exports.setMode = ( mode )=>{
    $$('.invite .lesson-action-panel-navigation p').filter( filterByText( mode ) ).first().click();
};

exports.setClassMode = ()=>{
    exports.setMode( exports.Modes.CLASS );
};

exports.setStudentMode = () =>{
    exports.setMode( exports.Modes.STUDENT );
};




exports.open = () => {
    return $('.forms .invite').isDisplayed().then( (result) => {
        if ( !result ){
            $click('setActiveAction(actionItems.INVITE)').click();
        }
    });
};

exports.class = new InvitePanel(exports.Modes.CLASS);
exports.student = new InvitePanel(exports.Modes.STUDENT);
