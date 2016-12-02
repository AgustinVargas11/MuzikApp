(function () {
    'use strict';

    angular
        .module('MediaApp')
        .directive('navbar', navbar);

    function navbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/directives/navbar/navbar.dir.html',
            controller: navbarController,
            controllerAs: 'nav',
            scope: {}
        };

        navbarController.$inject = ['authservice'];

        return directive;

        function navbarController(authservice) {
            var as = this;
            var isLoggedIn;

            init();

            as.logout = logout;

            function logout() {
                authservice.logout();
                init();
            }

            function init() {
                authservice.authenticate().then(function (response) {
                    isLoggedIn = as.isLoggedIn = response;
                });
            }
        }
    }
})();
