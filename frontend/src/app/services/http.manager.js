(() => {

    angular.module('app').factory('HttpManager', HttpManager);

    HttpManager.$inject = ['$http', '$q', '$state', '$timeout', '$rootScope', 'Alert'];

    function HttpManager($http, $q, $state, $timeout, $rootScope, Alert) {

        const API = '';

        return {
            request
        };

        function onSuccess(response) {

            return response;
        }

        function onError(rejection) {

            console.log(rejection);
            if ([401, 403].indexOf(rejection.status) > -1) {
                $state.go('auth.login');
            }

            if (rejection.status === 413) {
                Alert(
                    'Attachment is too large',
                    'Please choose another attachment or resize this one'
                );
            }

            if (rejection.status === 400) {
                Alert(
                    'Error',
                    rejection.data.message || 'Please try again'
                );
            }

            if (rejection.status === 401 || rejection.status === 402 || rejection.status === 403) {
                Alert(
                    'Unauthorized access',
                    rejection.data.message || 'Try to sign in again, please ...'
                );
            }

/*            if (rejection.status >= 500) {

                if (rejection.data && rejection.data.message)
                    Alert(
                        'Website error',
                        rejection.data.message
                    );
                else Alert(
                    'Website error',
                    'We apologize, an error occurred on our side while handling your request. Please try again or contact us.'
                );
            }*/

            return $q.reject(rejection);
        }

        function request({
                             method = 'get',
                             url = '/',
                             data = {},
                             headers = {},
                             transformRequest = null,
                             triggerCircleLoader = {
                                 trigger: false,
                                 message: null,
                             },
                         }) {

            if (triggerCircleLoader.trigger) {
                $timeout(() => {
                    $rootScope.$broadcast('circleLoaderStart', {
                        message: triggerCircleLoader.message
                    })
                });
            }

            let requestObject = {
                method: method,
                url: API + url,
                withCredentials: true
            };

            if (method.toLowerCase() === 'get' || method.toLocaleLowerCase() === 'delete') {
                requestObject.params = data;
            } else {
                requestObject.data = data;
            }

            if (transformRequest) requestObject.transformRequest = transformRequest;

            if (Object.keys(headers).length !== 0) requestObject.headers = headers;

            return $http(requestObject).then(
                onSuccess,
                onError
            ).then(resolve => {
                if (triggerCircleLoader.trigger) {
                    $timeout(() => {
                        $rootScope.$broadcast('circleLoaderStop', {
                            message: null
                        })
                    });
                }
                return resolve;
            }, reject => {
                if (triggerCircleLoader.trigger) {
                    $timeout(() => {
                        $rootScope.$broadcast('circleLoaderStop', {
                            message: null
                        })
                    });
                }
                return $q.reject(reject);
            });

        }
    }

})();