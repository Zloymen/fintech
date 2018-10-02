(() => {
    'use strict';

    angular.module('app').directive('browser', browser);

    browser.$inject = ['Device'];

    function browser(Device) {
        return {
            restrict: 'A',
            link: function (scope, elem) {

                const browser = Device.iOsSafari() ? 'safari-mobile' : 'browser';

                elem.addClass(browser);
            }

        }
    }
})();