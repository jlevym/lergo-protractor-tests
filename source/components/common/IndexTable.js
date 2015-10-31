'use strict';

var logger = require('log4js').getLogger('IndexTable');
var _ = require('lodash');

exports.getTableAction = function( action, required ){
    logger.info('getting table action');
    var root = $('#content .tab-content table thead tr:first-child  td:first-child');
    var caret = root.$('.caret' );
    var list = root.$('ul' );
    var listItems = root.$$('ul li' );

    list.isDisplayed().then(
        function(result){
            logger.info('is table actions present', result);
            if ( !result ){
                logger.info('clicking table actions menu to open it');
                caret.click();
            }

            browser.sleep(2000);

        });
    return $label(listItems, action, required);


};

// generates a function to be used in a component
exports.tableToJson_gen = function( root ){

    return function() {
        // this is a jquery function that will run in the browser..
        function tableToJson(selector) {
            var rows = _.map($(selector).find('tr'), function (r) {
                return _.map($(r).find('td'), function (c) {
                    var $c = $(c);
                    if ($c.children().length > 0) { // get only visible text
                        return $(c).find('*:not(:has(*)):visible').text();
                    } else { // no children.. get text
                        return $(c).text();
                    }
                });
            });

            var header = rows[0];
            rows.splice(0, 1);
            var objs = _.map(rows, function (r) {  // convert each row to object
                var me = {};
                _.each(header, function (h, index) {
                    me[h.toLowerCase()] = r[index].trim();
                });
                return me;
            });
            return objs;
        }

        // add protractor element on each row: http://docs.espressologic.com/blog/letsspeedupprotractorsdatalookup
        return browser.executeScript(tableToJson, root).then(function(data){
            //console.log('data is', data);
            // We have the table data, now supplement it with the WebElement for each row
            return $$(root + ' tr').then(function(rows) {

                rows.splice(0,1);

                _.each(rows, function(row, idx) {
                    data[idx].rowElm = row;
                });
                return data;
            });
        });
    };
};
