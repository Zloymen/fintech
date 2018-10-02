(() => {

    angular.module('app').controller('StepController', StepController);

    StepController.$inject = ['$scope', '$state', '$rootScope', 'Alert', '$timeout', 'OrderManager', 'ReservationManager', 'reservation'];

    function StepController($scope, $state, $rootScope, Alert, $timeout, OrderManager, ReservationManager, reservation) {

        let stepCtrl = this;

        //$scope.reservation = {phone: null, film: null, places:[]};
        $scope.reservation = {
            film: {id: 12, name: "Temporary Difficulties"},
            phone: "11111", day: new Date(),
            session: "3", places: []
        };

        $scope.toggle = function (item, list) {
            let idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1); else list.push(item);
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.step = 1;

        $scope.errMsg = "";

        $scope.search = "";

        $scope.$watch('reservation', function() {
            if($scope.reservation.film && $scope.reservation.day && $scope.reservation.session){
                ReservationManager.getUsedPlace($scope.reservation.film, $scope.reservation.day, $scope.reservation.session)
                    .then((result) =>{
                        console.log(result.data);
                        $scope.catalogs.places.forEach((item) =>{
                            item.disable = result.data.some(subItem => {
                                return subItem.id === item.id;
                            });
                        });
                        console.log($scope.catalogs.places);
                    })
            }
        }, true);

        $scope.onChange = (search) => {
        };
        $scope.query = (search) => {
            return search ? $scope.catalogs.films.filter(createFilterFor(search, 'name')) : $scope.catalogs.films;
        };

        function createFilterFor(query, name) {
            let lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (angular.lowercase(item[name]).indexOf(lowercaseQuery) === 0);
            };
        }

        $scope.catalogs = {};
        OrderManager.getCatalogs().then(result => {
            try {
                $scope.catalogs = result.data;
            } catch (e) {
                error(e);
            }
        }, (e) => {
            error(e);
        });

        function error(e) {
            if(e.data){
                $scope.errMsg = e.data.message;
                $scope.uid = e.data.uuid;
            }else{
                $scope.errMsg = 'Неизвестная ошибка!';
                $scope.uid = null;
            }
            $scope.step = 0;

        }

        $scope.stepSrc = () => {
            return $scope.step > 0 ? '/app/pages/step/step' + $scope.step + '.html' : '/app/pages/step/stepError.html';
        };

        $scope.cancel = () => {
            ReservationManager.cancel().then(() => {$state.go('appui.main');}, (e) => {
                error(e);
            });
        };

        $scope.pay = () => {
            OrderManager.buy().then((result) =>{
                $scope.step = 3;
            }, (e) => {
                error(e);
            });
        };

        $scope.reserved = () => {
            ReservationManager.save($scope.reservation).then(result => {
                setReservation(result.data);
            }, (e) => {
                error(e);
            });
        };

        $scope.savedReservation = null;

        let setReservation = (r) => {
            $scope.step = 2;
            $scope.savedReservation = r;
            $scope.savedReservation.strPlaces = $scope.savedReservation.places.map(item => item.name).join();
        };

        if (reservation && reservation.status && reservation.status === 200) {
            setReservation(reservation.data);
        }

        $scope.main = () => {
            $state.go('appui.main');
        };

    }

})();