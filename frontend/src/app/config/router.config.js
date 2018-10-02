(() => {

    angular.module('app').config(router);

    router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function router($stateProvider, $locationProvider, $urlRouterProvider, ReservationManager) {

        $locationProvider.html5Mode(true);
        
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('appui', {
                templateUrl: '/app/main.layout.html?1538469990642',
                controller: 'MainController'
            }).state('appui.main', {
                url: '/',
                templateUrl: '/app/pages/main/present.html?1538469990642',
                controller: 'PresentController',
                controllerAs: 'presentCtrl',
            }).state('appui.buy', {
                url: '/buy',
                templateUrl: '/app/pages/step/step.html?1538469990642',
                controller: 'StepController',
                controllerAs: 'stepCtrl',
                resolve: {
                    reservation: ['$rootScope', 'ReservationManager', ($rootScope, ReservationManager) => {
                        return ReservationManager.get();
                    }]}
            }).state('appui.info', {
                url: '/info',
                templateUrl: '/app/pages/info/info.html?1538469990642',
                controller: 'InfoController',
                controllerAs: 'infoCtrl',
                resolve: {
                    catalogs: ['$rootScope', 'OrderManager', ($rootScope, OrderManager) => {
                        return OrderManager.getCatalogs();
                    }]}
            });

    }
})();