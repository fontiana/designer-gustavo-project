(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('mainCtrl', mainCtrl)

    mainCtrl.$inject = ['authToken', '$state'];

    /** @ngInject */
    function mainCtrl(authToken, $state) {
        var vm = this;

        init();
        
        function init() {
            var isAuthenticated = authToken.isAuthenticated();
            
            if (!isAuthenticated) {
                $state.go('login');
            }
        }

    }

} ());