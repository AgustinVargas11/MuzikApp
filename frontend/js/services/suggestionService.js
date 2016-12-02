(function () {
    'use strict';

    angular
        .module('MediaApp')
        .factory('suggestionservice', suggestionservice);

    suggestionservice.$inject = ['$http'];

    function suggestionservice($http) {

        return {
            getTopSongsInGenre: getTopSongsInGenre
        };

        function getTopSongsInGenre() {
            return $http.get('/api/user/suggestions').then(function (response) {
                return response.data;
            })
        }
    }
})();