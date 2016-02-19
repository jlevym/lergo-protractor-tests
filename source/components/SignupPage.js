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

property_gen('username','username');
property_gen('email','email');
property_gen('fullName','fullName');
property_gen('name','fullName');
property_gen('password','password');
property_gen('confirmPassword','passwordConfirm');
property_gen('confirmEmail', 'emailConfirm');

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
        this.confirmEmail = opts.confirmEmail;
        this.email = opts.email;
        this.confirmPassword = opts.confirmPassword;
        this.fullName = opts.fullName;
   }
});

exports.route=function(){
    browser.get('#!/public/session/signup');
};
