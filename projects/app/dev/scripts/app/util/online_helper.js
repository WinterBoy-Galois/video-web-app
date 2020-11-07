var toasts = require('app/ui/toasts'),
    $ = require('jquery');


var showOfflineToast = function() {
    toasts.remove();
    toasts.error('It looks like you have lost your internet connection. Please make sure to have a working connection for the Videopath App to function correctly.', false, {
        timeOut: 200000,
        extendedTimeOut: 200000
    });
};

$(window).on('online', function() {
    toasts.remove();
    toasts.success('You are back online!');
});


$(window).on('offline', function() {
    showOfflineToast();
});