'use strict';



exports.getAddFaqItem = function(){
    return $click('addFAQ()');
};


exports.addFaq = function(){
    return exports.getAddFaqItem().click();
};

exports.getContents = function(){
  return $r('q in faq.contents');
};

exports.getContent = function(index){
    var contents =  exports.getContents();/*.then(function(contents){
        expect(contents.length > index).toBe(true,'faq content index ' + index + ' should exist');
        return contents[index];
    });*/
    return contents.get(index);
};

exports.removeFaq = function( index ){
    console.log('deleting item at',index);
    var result =  exports.getContent(index).$( '[ng-click="removeFAQ($index)"]').click();
    browser.sleep(2000);
    browser.switchTo().alert().accept();
    browser.sleep(2000);
    return result;
};

/**
 *
 * @param {object} opts
 * @param {int} opts.index
 * @param {string} [opts.question]
 * @param {string} [opts.answer]
 */
exports.setDetails = function(opts){
    var content = exports.getContent(opts.index);
    if ( opts.question ){
        console.log('setting question');
        content.element(by.model('q.question')).clear().sendKeys(opts.question);
    }
    if ( opts.answer){
        content.element(by.model('q.answer')).clear().sendKeys(opts.answer);
    }
    return content;

};
