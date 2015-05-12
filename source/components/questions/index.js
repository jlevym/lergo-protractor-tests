'use strict';


exports.editor = require('./QuestionEditor');
exports.view = require('./QuestionView');



global.LERGO_QUESTION_TYPE = {
    'multichoice' : { 'label' : 'Multiple Choices', 'id' : 'multichoice' }
};