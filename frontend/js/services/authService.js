(function () {
    'use strict';

    angular
        .module('MediaApp')
        .factory('authservice', authservice);

    authservice.$inject = ['$http', '$location'];

    function authservice($http, $location) {
        var authService = {
            authenticate: authenticate,
            getProfile: getProfile,
            updateProfile: updateProfile,
            logout: logout
        };

        return authService;

        function authenticate() {
            return $http.get('/auth/authenticate').then(function (response) {
                return response.data.isLoggedIn;
            });
        }

        function getProfile() {
            return $http.get('/api/user/userprofile').then(function (response) {
                return response.data;
            });
        }

        function updateProfile(updatedUserObj) {
            return $http.put('/api/user/userprofile', updatedUserObj).then(function (response) {
                return response.data;
            });
        }

        function logout() {
            $http.get('/auth/logout');
            $location.path('/');
        }
    }
})();