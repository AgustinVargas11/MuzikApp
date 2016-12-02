(function () {
    angular
        .module('MediaApp')
        .directive('musicVideo', musicVideo);

    musicVideo.$inject = ['playservice'];

    function musicVideo(playservice) {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/directives/videos/videos.dir.html',
            link: link,
            scope: {
                videos: '=',
                filter: '='
            }
        };

        return directive;

        function link(scope) {
            scope.togglePlay = function (media, id) {
                var mediaSnippet = document.getElementById(id);
                if (!media.play) {
                    playservice.startPlaying(media, mediaSnippet);
                } else {
                    playservice.stopPlaying(media, mediaSnippet);
                }
            };
        }
    }
})();