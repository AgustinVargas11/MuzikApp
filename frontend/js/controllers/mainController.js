(function () {
    'use strict';

    angular
        .module('MediaApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$uibModal', '$document', '$location', 'authservice'];

    function MainController($uibModal, $document, $location, authservice) {
        var mc = this;
        init();

        var isLoggedIn;

        mc.open = openModal;
        mc.ok = closeModal;

        function closeModal() {
            mc.$close();
            goToSearch();
        }

        function goToSearch() {
            $location.path('/search');
        }

        function init() {
            authservice.authenticate().then(function (response) {
                isLoggedIn = mc.isLoggedIn = response;
            });
        }

        function openModal(elem) {
            var parentElem = angular.element($document[0].querySelector(elem));
            $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/templates/myModalContent.tpl.html',
                size: 'md',
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                appendTo: parentElem,
                bindToController: true,
                backdrop: 'static'
            });
        }
    }
})();