(() => {
    'use strict';

    angular.module('app').directive('compare', compare);

    function compare() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                compareTo: '=compare',
            },
            link: function (scope, elem, attrs, ngModel) {
                ngModel.$validators.notEqual = function (modelValue, viewValue) {
                    if (ngModel.$isEmpty(modelValue)) return true;
                    return viewValue === scope.compareTo.$viewValue;
                };

                scope.$watch('compareTo.$viewValue', () => {
                    ngModel.$validate();
                })
            }
        }
    }
})();