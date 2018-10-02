(() => {

  angular.module('app')
    .directive('circleLoader', circleLoader);

  function circleLoader() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './app/shared/circle-loader/circle-loader.html',
      controller: ['$scope', '$timeout', '$interval', ($scope, $timeout, $interval) => {

        const body = angular.element(document.body);
        const touchMoveHandler = ev => {
          ev.preventDefault();
        };

        $scope.circleLoaderMessage = null;
        $scope.showCircleLoader = false;

        $scope.$on('circleLoaderStart', (ev, data) => {

          // Prevent body from scrolling on mobile devices and desktops
          // body.on('touchmove', null, touchMoveHandler);
          // body.addClass('no-scroll');

          $scope.circleLoaderMessage = data.message;
          $scope.showCircleLoader = true;
        });

        $scope.$on('circleLoaderStop', () => {
          $scope.showCircleLoader = false;

          // allow scrolling back
          // body.off('touchmove', null, touchMoveHandler);
          // body.removeClass('no-scroll');

          // circle layout will fade away in 400ms, so set message to null after layout disappears
          $timeout(() => {
            $scope.circleLoaderMessage = null;
          }, 400);

        })

      }]
    }
  }

})();