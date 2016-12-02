(function () {
    'use strict';

    angular
        .module('MediaApp')
        .filter('trustedUrl', trustedUrl);

    trustedUrl.$inject = ['$sce'];

    function trustedUrl($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    };
})();