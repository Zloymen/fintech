(() => {

    angular.module('app').directive('uploadFile', uploadFile);

    uploadFile.$inject = ['$timeout'];

    function uploadFile($timeout) {
        return {
            restrict: 'A',
            link: (scope, elem) => {
                elem.on('change', () => {
                    $timeout(() => {
                        scope.uploadCtrl.uploadData.file = elem[0].files[0];
                    }, 100);
                })
            }
        }
    }
})();