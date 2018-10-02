(() => {

    angular.module('app').controller('InfoController', InfoController);

    InfoController.$inject = ['$scope',  '$log', '$state', '$timeout', 'catalogs', 'OrderManager'];

    function InfoController($scope,  $log, $state, $timeout, catalogs, OrderManager) {

        let infoCtrl = this;

        if(catalogs &&  catalogs.data) $scope.catalogs = catalogs.data;

        $scope.find = () => {
            if($scope.film && $scope.session && $scope.day)
                OrderManager.report($scope.film, $scope.day, $scope.session).then(result => {
                    $scope.gridOptions.data = result.data;
                });
        };

        $scope.gridOptions = {
            columnDefs: [
                { name:'Место', field: 'place.name', enableSorting: false },
                { name:'Телефон', field: 'phone', enableSorting: false },
                { name:'Тип', field: 'type', enableSorting: false}
            ],
            data: []
        };

        $scope.main = () => {
            $state.go('appui.main');
        };

        $scope.onChange = (search) => {
        };

        $scope.clear = () => {
            $scope.film = null;
            $scope.session = null;
            $scope.day = new Date();
            $scope.gridOptions.data = [];
        };

        $scope.clear();

        $scope.query = (search) => {
            return search ? $scope.catalogs.films.filter(createFilterFor(search, 'name')) : $scope.catalogs.films;
        };

        function createFilterFor(query, name) {
            let lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (angular.lowercase(item[name]).indexOf(lowercaseQuery) === 0);
            };
        }

    }

})();