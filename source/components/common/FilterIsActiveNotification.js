'use strict';


exports.rootElement=$('[filter-is-active]');

exports.hideNotification = function(){
    $('[ng-click="hideNotification()"]').click();
};

exports.resetFilter = function(){
    $('[lergo-reset-filter]').click();
};
