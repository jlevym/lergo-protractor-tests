'use strict';

var property_gen = function( name , model ){
    Object.defineProperty(module.exports,name, {
        get: function(){
            return $m(model).getText();
        },
        set: function(value){
            if ( !!value ){
                return $m(model).sendKeys(value);
            }
        }
    });
};

property_gen('username','signupForm.username');
property_gen('email','signupForm.email');
property_gen('fullName','signupForm.fullName');
property_gen('name','signupForm.fullName');
property_gen('password','signupForm.password');
property_gen('confirmPassword','signupForm.passwordConfirm');

Object.defineProperty(module.exports,'errorMessage', {
    get: function(){
        return $('.section .label .errorMessage').getText();
    }
});

exports.submit = function(){
    return $('form [type="submit"]').click();
};

Object.defineProperty(module.exports,'details', {
    /**
     *
     * @param {object} opts
     * @param {string} opts.password
     * @param {string} opts.confirmPassword
     * @param {string} opts.username
     * @param {string} opts.email
     * @param {string} opts.fullName
     */
   set: function(opts){
        this.username = opts.username;
        this.password = opts.password;
        this.email = opts.email;
        this.fullName = opts.fullName;
        this.confirmPassword = opts.confirmPassword;
   }
});

exports.route=function(){
    browser.get('#!/public/session/signup');
};
