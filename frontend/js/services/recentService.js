(function () {
        'use strict';

        angular
            .module('MediaApp')
            .factory('recentservice', recentservice);

        recentservice.$inject = ['$http', '$log'];

        function recentservice($http, $log) {

            var recentService = {
                getSearchHistory: getSearchHistory,
                addRecentSearch: addRecentSearch,
                clearRecentSearches: clearRecentSearches
            };

            return recentService;

            function Search(artist, genre) {
                this.name = artist.toLowerCase();
                this.genre = genre;
                return this;
            }

            function getSearchHistory() {
                return $http.get('/api/user/recentsearch').then(function (response) {
                    return response.data;
                })
            }

            function addRecentSearch(history, artist, genre) {
                var index = null;
                var query = new Search(artist, genre);

                for (var i = 0, n = history.length; i < n; i++) {
                    if (history[i].name === query.name) {
                        history.splice(index, 1);
                        break;
                    }
                }

                history.unshift(artist);

                saveSearch(query);
                return history;
            }

            function saveSearch(query) {
                return $http.post('/api/user/recentsearch', query).then(function (response) {
                    $log.info(response);
                    return response;
                })
            }

            function clearRecentSearches(history) {
                history.length = 0;
                return $http.delete('/api/user/recentsearch').then(function (response) {
                    $log.info(response);
                })
            }
        }
    })();
