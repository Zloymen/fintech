(() => {

    angular.module('app').controller('MainController', MainController);

    MainController.$inject = ['$state', '$scope', '$rootScope', 'Prompt', '$mdSidenav', '$timeout', '$mdDialog'];

    function MainController($state, $scope, $rootScope,  Prompt, $mdSidenav, $timeout, $mdDialog) {

        $rootScope.applicationLoaded = true;

        $scope.showToolbar = () => {
            return !$state.includes('auth');
        };

        $scope.openMenu = ($mdMenu, ev) => {
            $mdMenu.open(ev);
        };

        $scope.toggleSidenav = () => {
            $mdSidenav('sidenav-left').toggle();
        };
    }

})();