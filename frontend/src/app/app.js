(() => {
    angular.module('app', [
        'ng',
        'ngRoute',
        'ngMaterial',
        'ngMessages',
        'ngAria',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngCookies',
        'LocalStorageModule',
        'md.data.table',
        'ui.router',
        'ui.mask',
        'datetime',
        'textAngular',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.grid.cellNav',
        'ui.grid.grouping',
        'ui.grid.autoResize',
        'rzModule',
        'ui-rangeSlider'
    ]).config(['uiMask.ConfigProvider', uiMaskConfigProvider => {
        uiMaskConfigProvider.maskDefinitions({'K': /[a-zA-Z0-9]/, '*': /[a-zA-Z0-9]/});
        uiMaskConfigProvider.clearOnBlur(false);

    }])
        .config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
            $mdDateLocaleProvider.firstDayOfWeek = 1;

            $mdDateLocaleProvider.formatDate = function (date) {
                return moment(date).format('DD-MM-YYYY');
            };
            $mdDateLocaleProvider.parseDate = function (strDate) {
                return moment(strDate ,'DD.MM.YYYY').toDate();
            };
        }]);


})();