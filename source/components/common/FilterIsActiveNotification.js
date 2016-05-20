'use strict';


exports.rootElement=$('[filter-is-active]');
exports.displayElement=$('[filter-is-active-show-hide]'); // guy - split to a different directly to fix limited editor filter reset

exports.hideNotification = function(){
    exports.rootElement.$('.close').click();
};

exports.resetFilter = function(){
    exports.rootElement.$('[lergo-reset-filter]').click();
};
