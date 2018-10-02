(() => {
    'use strict';

    angular.module('app').factory('Prompt', Prompt);

    Prompt.$inject = ['$mdDialog'];

    function Prompt($mdDialog) {
        return function (title,
                         textContent = null,
                         placeholder = '',
                         ok = 'Ok',
                         cancel = 'Cancel') {
            return $mdDialog.show($mdDialog.prompt()
                .title(title)
                .textContent(textContent)
                .placeholder(placeholder)
                .required(true)
                .ok(ok)
                .cancel(cancel)
            )
        }
    }
})();