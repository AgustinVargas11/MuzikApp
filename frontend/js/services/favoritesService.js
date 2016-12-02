(function () {
    'use strict';

    angular
        .module('MediaApp')
        .factory('favoriteservice', favoriteservice);

    favoriteservice.$inject = ['$http', '$log', 'authservice'];

    function favoriteservice($http, $log, authservice) {
        var fs = this;
        var favorites;
        var isLoggedIn;
        fs.isLoggedIn = false;

        init();

        var favoriteService = {
            getFavorites: getFavorites,
            favoriteSnippet: favoriteSnippet,
            removeSnippet: removeSnippet,
            checkFavoriteStatus: checkFavoriteStatus,
            getFavoriteIds: getFavoriteIds
        };

        return favoriteService;

        function checkFavoriteStatus(song) {
            song.favorited = favorites.indexOf(song.trackId) >= 0;
            return song;
        }

        function favoriteSnippet(snippetObj) {
            favorites.unshift(snippetObj.trackId);
            return $http.post('/api/favorites/music', snippetObj).then(function (response) {
                return response.data;
            });
        }

        function getFavoriteIds() {
            return $http.get('/api/favorites/music?ids=true').then(function (response) {
                favorites = response.data;
            });
        }

        function getFavorites() {
            return $http.get('/api/favorites/music').then(function (response) {
                return response.data;
            })
        }

        function init() {
            authservice.authenticate().then(function (response) {
                isLoggedIn = fs.isLoggedIn = response;

                if (isLoggedIn)
                    getFavoriteIds();
            });
        }

        function removeSnippet(snippetId) {
            favorites.splice(favorites.indexOf(snippetId), 1);
            return $http.delete('/api/favorites/remove/' + snippetId).then(function (response) {
                $log.info(response);
            });
        }
    }
})();