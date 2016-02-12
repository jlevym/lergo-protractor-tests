'use strict';


var logger = browser.getLogger('classInvite.spec');
var components = require('components');
//
describe('lesson invite class',  ()  => {

    beforeEach( () => { logger.info('running from ' + __filename); });

    it('should allow students to register their name', (done) => {
        components.loginPage.load();
        components.loginPage.login( components.conf.classInvite.username, components.conf.classInvite.password );

        components.homepage.goToLessonIntro( { 'name' : components.conf.classInvite.lesson });
        components.lesson.intro.invite.open();
        components.lesson.intro.invite.setClassMode();

        var inviteeName = '10th graders ' + new Date().getTime();
        var studentName = 'student_' + new Date().getTime();


        components.lesson.intro.invite.class.setName( inviteeName );
        components.lesson.intro.invite.class.submit();
        components.lesson.intro.invite.class.getLink().then((link)=>{
            logger.info('link is [' +  link + ']');
            browser.get(link);
            browser.sleep(1000);
        });


        components.lesson.intro.classInvite.setStudentName(studentName);
        components.lesson.intro.classInvite.submit();

        components.lesson.intro.startLesson();
        browser.sleep(1000).then(done);

    });

});
