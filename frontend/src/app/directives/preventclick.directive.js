(() => {
    'use strict';

    angular.module('app').directive('preventClick', preventClick);

    function preventClick() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                $(element).click(function (event) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                });
            }
        }
    }
})();