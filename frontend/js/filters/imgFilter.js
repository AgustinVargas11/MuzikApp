(function () {
    angular
        .module('MediaApp')
        .filter('imgFilter', imgFilter);

    function imgFilter() {
        return function (input, size) {
            return input.replace(/100/g, size);
        }
    }
})();
