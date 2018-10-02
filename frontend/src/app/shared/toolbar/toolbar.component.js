(() => {

  angular.module('app').directive('toolbar', toolbar);

  // toolbar.$inject = [];
  function toolbar() {
    return {
      restrict: 'E',
      templateUrl: './app/shared/toolbar/toolbar.html',
      replace: true,
    }
  }

});