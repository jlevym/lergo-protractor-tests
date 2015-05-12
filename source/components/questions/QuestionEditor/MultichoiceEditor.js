'use strict';

var util = require('util');
var _super = require('./AbstractQuestion');
var _ = require('lodash');

function Editor(){

}

util.inherits( Editor, _super );

Editor.prototype.setType = function(){
    return _super.prototype.setType(LERGO_QUESTION_TYPE.multichoice);
};

Editor.prototype.setDisableShuffle = function(){
    return $m('quizItem.shuffleDisabled').click();
};

Editor.prototype.setOptions = function( options ){
    for ( var i = 1; i < options.length; i++ ){
        $click('addOption()').click();
    }
    return $r('option in quizItem.options').then(function(optionElements){
        _.each(options, function(item,index){
            var elem = optionElements[index];

            if ( item.checked ){
                elem.element(by.model('option.checked')).click();
            }
             elem.element(by.model('option.label')).sendKeys(item.value).then(function(){ console.log('I set keys!'); });
        });
        return browser.controlFlow().execute(function(){ return true; });
    });
};

module.exports = new Editor();
