'use strict';

var components = require('components');


describe('limited editor', function(){
    it('should be able to edit lessons within limits', function(){
        components.loginPage.load().login(components.conf.availableUsers.limitedEditor);
        components.layout.goToManageLessons();
        components.manage.lessons.index.goToLesson({name: 'limited_editor_should_edit'});
        expect(components.lesson.intro.getEditButton()).toBeDisplayed('limited editor should see edit button');
        components.layout.logout();
    });
});
