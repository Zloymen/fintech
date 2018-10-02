(() => {

    angular.module('app').controller('PresentController', PresentController);

    PresentController.$inject = ['$scope',  '$log', '$state', '$timeout'];

    function PresentController($scope,  $log, $state, $timeout) {

        let mainCtrl = this;

        $scope.buy = () => {
            $state.go('appui.buy');
        };
        $scope.info = () => {
            $state.go('appui.info');
        };

    }

})();