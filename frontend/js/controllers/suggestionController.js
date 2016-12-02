(function () {
    'use strict';

    angular
        .module('MediaApp')
        .controller('SuggestionController', SuggestionController);

    SuggestionController.$inject = ['suggestionservice'];

    function SuggestionController(suggestionservice) {
        var sc = this;
        suggestionservice.getTopSongsInGenre().then(function (response) {
            sc.suggestions = response;
        });
    }
})();

