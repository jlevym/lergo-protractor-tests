'use strict';


exports.rootElement=$('[filter-is-active]');

exports.hideNotification = function(){
    exports.rootElement.$('.close').click();
};

exports.resetFilter = function(){
    exports.rootElement.$('[lergo-reset-filter]').click();
};
