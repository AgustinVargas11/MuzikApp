(function () {
    'use strict';

    angular
        .module('MediaApp')
        .controller('FavoritesController', FavoritesController);

    FavoritesController.$inject = ['favoriteservice', 'playservice'];

    function FavoritesController(favoriteservice, playservice) {
        var fc = this;

        init();
        fc.filter = 'all';

        fc.removeFromFavorites = removeFromFavorites;

        function init() {
            favoriteservice.getFavorites().then(function (response) {
                fc.favorites = response;
            });
        }

        function removeFromFavorites(songs, index) {
            console.log(index);
            favoriteservice.removeSnippet(songs[index]._id);
            songs.splice(index, 1);
            playservice.clearCache();
            init();
            return songs;
        }
    }
})();
