'use strict';

exports.TABLE_ACTIONS = {
    DELETE_LESSON: 'delete',
    PUBLISH_LESSON: 'publish',
    UNPUBLISH_LESSON: 'unpublish'
};

exports.getTableAction = function( action, required ){
    var root = $('#content .tab-content table thead tr:first-child  td:first-child');
    var caret = root.$('.caret' );
    var list = root.$('ul' );
    var listItems = root.$$('ul li' );

    list.isDisplayed().then(
    function(result){
        console.log('is present', result);
        if ( !result ){
            console.log('clicking');
            caret.click();
        }
    });
    return $label(listItems, action, required);

};
