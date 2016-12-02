'use strict';

var app = angular.module('MediaApp');

app.directive('suggestedSong', ['playservice', function (playservice) {
    var directive = {
        restrict: 'E',
        templateUrl: 'js/directives/suggestedSong/suggestedSong.dir.html',
        link: link,
        scope: {
            suggestions: '='
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
        }
    }
}]);