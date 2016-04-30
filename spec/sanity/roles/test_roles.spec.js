'use strict';

var components = require('components');
var logger = browser.getLogger('test_roles.spec');

describe('roles', function(){
    beforeEach(function(){ logger.info('running from ' + __filename); });

    describe('management', function(){
        var newRoleName = 'new-role-' + new Date().getTime();
        it('can create new role', function(){
            browser.get('/');
            components.filter.resetIfDisplayed();
            components.loginPage.load().login( components.conf.roles.adminUser, components.conf.roles.adminPassword );
            browser.sleep(2000);
            components.layout.goToManageRoles();
            components.manage.roles.index.createNewRole();
            components.manage.roles.edit.setDetails({
                'name' : newRoleName,
                'description' : 'auto generate role in test',
                'permissions' : {
                    'lessons.userCanEdit' : true,
                    'roles.userCanCreate' : true
                }
            });
            components.manage.roles.edit.save();

            expect(components.manage.roles.index.find( { name : newRoleName }).count()).toBe(1);

            components.layout.logout();
        });


        /**
         * This test assumes
         * 1. Role 'role_to_assign' exists
         * 2. User conf.roles.username exists without the role assigned to him. (if role assigned, test will still pass..)
         *
         * This test checks:
         *  - an admin can go to manage users
         *  - an admin can edit user roles
         *  - once a role is checked, it appears on the edit user screen.
         */

        it('can assign role to user', function(){
            browser.get('/');
            components.filter.resetIfDisplayed();
            components.loginPage.load().login( components.conf.roles.adminUser, components.conf.roles.adminPassword );

            components.layout.goToManageUsers();
            components.manage.users.index.goToUser({ username: components.conf.roles.username });


            components.manage.users.edit.openEditRoles();
            components.manage.users.edit.editRolesDialog.selectRoles({
                'role_to_assign' : true
            });
            components.manage.users.edit.editRolesDialog.submit();
            expect(components.manage.users.edit.getRoles().count()).toBe(1);

            components.layout.logout();
        });

        /**
         * This test assumes
         * 1. Role 'editor' exists with permissions to edit lessons
         * 2. User conf.roles.editor exists. isAdmin = false.
         *
         * This test checks:
         *  - user with right lesson editing permissions can reach "manage lessons".
         *
         */
        it('gives user new abilities', function(){
            browser.get('/');
            components.filter.resetIfDisplayed();
            components.loginPage.load().login( components.conf.roles.editorUser, components.conf.roles.editorPassword );



            components.layout.goToManageLessons();

            components.layout.logout();
        });
    });

});
