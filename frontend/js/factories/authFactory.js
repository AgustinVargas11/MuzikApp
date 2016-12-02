(function () {
    'use strict';

    angular
        .module('MediaApp')
        .factory('authinterceptor', authinterceptor);
    authinterceptor.$inject = ['$location', '$q'];

    function authinterceptor($location, $q) {
        var authinterceptor = {
            responseError: responseError
        };

        return authinterceptor;

        function responseError(response) {
            if (response.status === 401) $location.path('/');
            return $q.reject(response);
        }
    }
})();
