(() => {

    angular.module('app').factory('OrderManager', OrderManager);

    OrderManager.$inject = ['HttpManager'];

    function OrderManager(HttpManager) {

        return {
            report,
            getCatalogs,
            buy
        };

        function getCatalogs() {
            return HttpManager.request({
                method: 'GET',
                url: '/order/catalogs'
            });
        }

        function report(film, day, session) {
            return HttpManager.request({
                method: 'GET',
                url: '/order/report',
                data:{
                    filmId: film.id,
                    day: moment(day).format('DD.MM.YYYY'),
                    sessionId: session}
            });
        }

        function buy() {
            return HttpManager.request({
                method: 'POST',
                url: '/order/'
            });
        }
    }


})();