(function () {
    angular
        .module('MediaApp')
        .directive('music', music);

    music.$inject = ['authservice', 'favoriteservice', 'playservice'];

    function music(authservice, favoriteservice, playservice) {

        var directive = {
            restrict: 'E',
            templateUrl: 'js/directives/music/music.dir.html',
            link: link,
            scope: {
                songs: '=',
                filter: '=',
                removeFromFavorites: '&'
            }
        };

        return directive;

        function link(scope) {
            var loggedIn;

            init();

            scope.togglePlay = function (media, id) {
                var mediaSnippet = document.getElementById(id);
                if (!media.play) {
                    playservice.startPlaying(media, mediaSnippet);
                } else {
                    playservice.stopPlaying(media, mediaSnippet);
                }
            };

            function addToFavorites(obj) {
                favoriteservice.favoriteSnippet(obj);
            }

            function checkFavoriteStatus(song) {
                favoriteservice.checkFavoriteStatus(song);
            }

            function init() {
                authservice.authenticate().then(function (response) {
                    loggedIn = scope.loggedIn = response;

                    if (loggedIn) {
                        scope.addToFavorites = addToFavorites;
                        scope.checkFavoriteStatus = checkFavoriteStatus;
                    }
                });
            }
        }
    }
})();