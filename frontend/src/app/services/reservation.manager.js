(() => {

    angular.module('app').factory('ReservationManager', ReservationManager);

    ReservationManager.$inject = ['HttpManager'];

    function ReservationManager(HttpManager) {

        return {
            getUsedPlace,
            get,
            cancel,
            save
        };

        function get() {
            return HttpManager.request({
                method: 'GET',
                url: '/reservation/'
            });
        }

        function getUsedPlace(film, day, session) {
            return HttpManager.request({
                method: 'GET',
                url: '/reservation/usedPlaces',
                data:{
                    filmId: film.id,
                    day: moment(day).format('DD.MM.YYYY'),
                    sessionId: session}
            });
        }

        function cancel() {
            return HttpManager.request({
                method: 'POST',
                url: '/reservation/delete'
            });
        }

        function save(reservation) {
            let reservationCopy = angular.copy(reservation);
            reservationCopy.day = moment(reservationCopy.day).format('DD.MM.YYYY');
            reservationCopy.film = reservationCopy.film.id;
            return HttpManager.request({
                method: 'POST',
                url: '/reservation/',
                data: reservationCopy
            });
        }
    }


})();