(function () {
    'use strict';

    angular
        .module('MediaApp')
        .config(config);

    config.$inject = ['$routeProvider', '$httpProvider'];

    function config($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './templates/landing.tpl.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .when('/myfavs', {
                templateUrl: './templates/fav.tpl.html',
                controller: 'FavoritesController',
                controllerAs: 'fav'
            })
            .when('/search', {
                templateUrl: './templates/media.tpl.html',
                controller: 'MediaController',
                controllerAs: 'media'
            })
            .when('/privacy', {
                templateUrl: './templates/privacy.tpl.html'
            })
            .when('/info', {
                templateUrl: './templates/info.tpl.html'
            })
            .when('/profile', {
                templateUrl: './templates/profile.tpl.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
            })
            .otherwise('/');

        $httpProvider.interceptors.push('authinterceptor');
    }
})();