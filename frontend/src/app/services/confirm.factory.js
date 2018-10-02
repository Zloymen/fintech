(() => {
    'use strict';

    angular.module('app').factory('Confirm', Confirm);

    Confirm.$inject = ['$mdDialog'];

    function Confirm($mdDialog) {
        return function (title, textContent = null, ok = 'Ok', cancel = 'Cancel') {
            return $mdDialog.show($mdDialog.confirm()
                .title(title)
                .textContent(textContent)
                .ok(ok)
                .cancel(cancel)
            )
        }
    }
})();