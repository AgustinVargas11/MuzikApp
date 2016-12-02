(function () {
    'use strict';

    angular
        .module('MediaApp')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$cacheFactory'];

    function dataservice($http, $cacheFactory) {
        var url = 'https://itunes.apple.com/search';
        var snippetCache = $cacheFactory('snippet-cache');

        var dataService = {
            getAlbums: getAlbums,
            getSongs: getSongs,
            getMusicVideos: getMusicVideos
        };

        return dataService;

        function getAlbums(artist, limit) {
            return $http.jsonp(url, {
                params: {term: artist, limit: limit, entity: 'album', callback: 'JSON_CALLBACK'},
                cache: snippetCache
            }).then(function (response) {
                return response.data.results;
            })
        }

        function getSongs(artist) {
            return $http.jsonp(url, {
                params: {term: artist, limit: 21, entity: 'song', media: 'music', callback: 'JSON_CALLBACK'},
                cache: snippetCache
            }).then(function (response) {
                return response.data.results;
            })
        }

        function getMusicVideos(artist) {
            return $http.jsonp(url, {
                params: {
                    term: artist,
                    limit: 3,
                    media: 'musicVideo',
                    entity: 'musicVideo',
                    callback: 'JSON_CALLBACK'
                },
                cache: snippetCache
            }).then(function (response) {
                return response.data.results;
            });
        }
    }
})();