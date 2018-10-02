(() => {
    'use strict';

    angular.module('app').factory('Alert', Alert);

    /**
     *
     * @description We are using custom dialog instead of default alert
     * because alert doesn't allow you to use html in the dialog's title
     */
    Alert.$inject = ['$mdDialog'];

    function Alert($mdDialog) {
        return function (title, htmlContent, ok = 'Ok') {

            const alert = {
                template:
                    ['<md-dialog>',
                        '  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">',
                        '    <h2 class="md-title" ng-bind-html="::dialog.title"></h2>',
                        '    <div ng-if="::dialog.mdHtmlContent" class="md-dialog-content-body"',
                        '        ng-bind-html="::dialog.htmlContent"></div>',
                        '  </md-dialog-content>',
                        '  <md-dialog-actions>',
                        '    <md-button ng-click="dialog.hide()" class="md-accent md-confirm-button" style="color: white;" md-autofocus="true">',
                        '      {{ dialog.ok }}',
                        '    </md-button>',
                        '  </md-dialog-actions>',
                        '</md-dialog>'
                    ].join('').replace(/\s\s+/g, ''),
                controllerAs: 'dialog',
                multiple: true,
                controller: ['$mdDialog', function ($mdDialog) {

                    let dialog = this;

                    [dialog.title, dialog.htmlContent, dialog.ok = ok] = [title, htmlContent, ok];

                    dialog.hide = function () {
                        $mdDialog.hide();
                    }

                }]

            };

            return $mdDialog.show(alert);

        }
    }
})();