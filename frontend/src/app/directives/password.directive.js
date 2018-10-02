(() => {
    'use strict';

    angular.module('app').directive('strongPassRequired', function () {

        let isValid = function (s) {
            return s && /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}/.test(s)
        };

        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('strongPass', isValid(viewValue));
                    return viewValue;
                });

                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('strongPass', isValid(modelValue));
                    return modelValue;
                });
            }
        };
    }).directive('passwordMatch', [function () {
            return {
                restrict: 'A',
                scope: true,
                require: 'ngModel',
                link: function (scope, elem, attrs, control) {
                    let checker = function () {

                        //get the value of the first password
                        let e1 = scope.$eval(attrs.ngModel);

                        //get the value of the other password
                        let e2 = scope.$eval(attrs.passwordMatch);

                        control.$validators.check = function (modelValue) {
                            return !control.$isEmpty(modelValue) && modelValue === e2;
                        };

                        return e1 === e2;
                    };
                    scope.$watch(checker, function (n) {

                        //set the form control to valid if both
                        //passwords are the same, else invalid
                        control.$setValidity("unique", n);
                    });
                }
            };
        }]);
})();