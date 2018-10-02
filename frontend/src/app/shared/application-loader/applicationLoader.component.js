(() => {
  'use strict';

  angular.module('app').directive('applicationLoader', applicationLoader);

  // applicationLoader.$inject = [];
  function applicationLoader() {
    return {
      restrict: 'E',
      templateUrl: 'shared/application-loader/application-loader.html'
    }
  }
})();