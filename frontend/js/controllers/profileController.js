(function () {
    'use strict';

    angular
        .module('MediaApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$timeout', 'authservice'];

    function ProfileController($timeout, authservice) {
        var pc = this;

        init();

        pc.updateState = 'save';

        pc.updateUserProfile = updateUserProfile;

        function init() {
            authservice.getProfile().then(function (response) {
                pc.user = response;
            });
        }

        function updateUserProfile(updatedUserObj) {
            pc.updateState = 'saving';
            authservice.updateProfile(updatedUserObj).then(function (response) {
                $timeout(function () {
                    pc.updateState = 'saved';
                }, 1000);
                pc.user = response;
                pc.update = {};
            })
        }
    }
})();