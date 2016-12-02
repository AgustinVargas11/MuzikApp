(function () {
    'use strict';

    angular.module('MediaApp')
        .controller('MediaController', MediaController);

    MediaController.$inject = ['dataservice', 'artistservice', 'recentservice', 'authservice'];

    function MediaController(dataservice, artistservice, recentservice, authservice) {
        var mc = this;

        var isLoggedIn;
        var search = '';
        var selectedAlbum = '';
        var artist = artistservice.getRandomArtist();

        mc.clear = clear;
        mc.getSongs = getSongs;
        mc.getVideos = getVideos;
        mc.getAlbums = getAlbums;
        mc.submitForm = submitForm;
        mc.getAllMedia = getAllMedia;
        mc.items = [{type: 'all'}, {type: 'songs'}, {type: 'videos'}];

        init();

        function addSearchToRecent(artist, genre) {
            recentservice.addRecentSearch(mc.history, artist, genre);
        }

        function clear(history) {
            recentservice.clearRecentSearches(history);
        }

        function getAlbums(artist) {
            dataservice.getAlbums(artist, 4).then(function (response) {
                mc.albums = response;
            });
        }

        function getAllMedia(album, artist) {

            if (selectedAlbum === album)
                return;

            getSongs(album || artist);
            getAlbums(artist);
            getVideos(artist);
            selectedAlbum = album;
            return {success: true};
        }

        function getRecentSearches() {
            recentservice.getSearchHistory().then(function (response) {
                mc.history = response;
            });
        }

        function getSongs(artist) {
            dataservice.getSongs(artist).then(function (response) {
                mc.songs = response;
            });
        }

        function getVideos(artist) {
            dataservice.getMusicVideos(artist).then(function (response) {
                mc.videos = response;
            })
        }

        function init() {
            getAlbums(artist);
            authservice.authenticate().then(function (response) {
                isLoggedIn = mc.isLoggedIn = response;

                if (isLoggedIn)
                    getRecentSearches();
            });
        }

        function submitForm(artist) {
            if (search === artist)
                return form.reset();

            getAllMedia(null, artist).then(function (response) {
                form.reset();

                if (isLoggedIn) {
                    var genre = mc.songs[0].primaryGenreName || 'unknown';
                    addSearchToRecent(artist, genre);
                }
            });
            search = artist;
        }
    }
})();
