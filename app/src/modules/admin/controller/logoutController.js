(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('logoutCtrl', logoutCtrl)

    logoutCtrl.$inject = ['authToken', '$state'];

    /** @ngInject */
    function logoutCtrl(authToken, $state) {
        init();
        function init() {
            authToken.removeToken();
            $state.go('login');
        }
    }

} ());