(function () {
    'use strict';

    angular
        .module('MediaApp')
        .factory('playservice', playservice);

    playservice.$inject = ['$timeout', 'favoriteservice', 'authservice'];

    function playservice($timeout, favoriteservice, authservice) {
        var currentlyPlaying = null;

        var playService = {
            startPlaying: startPlaying,
            stopPlaying: stopPlaying,
            clearCache: clearCache
        };


        return playService;

        function checkFavoriteStatus(song) {
            return favoriteservice.checkFavoriteStatus(song);
        }

        function clearCache() {
            currentlyPlaying = null;
        }

        function startPlaying(mediaObj, mediaSnippet) {
            if (currentlyPlaying !== null)
                stopPlaying(currentlyPlaying, currentlyPlaying.mediaSnippet);

            if (favoriteservice.isLoggedIn)
                checkFavoriteStatus(mediaObj);

            $timeout(play, 150);
            mediaObj.play = true;
            currentlyPlaying = mediaObj;
            currentlyPlaying.mediaSnippet = mediaSnippet;

            function play() {
                mediaSnippet.play();
            }
        }

        function stopPlaying(mediaObj, mediaSnippet) {
            mediaObj.play = false;
            mediaSnippet.pause();
            clearCache();
        }
    }
})();