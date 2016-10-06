(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('loginCtrl', loginCtrl)

    loginCtrl.$inject = ["$http", 'appSettings', '$state', 'authToken', 'Flash'];

    /** @ngInject */
    function loginCtrl($http, appSettings, $state, authToken, Flash) {
        var vm = this;

        vm.login = login;

        function login() {
            var configHttp = {
                url: appSettings.comunicacao.urlAdmin + 'login',
                data: {
                    email: vm.email,
                    senha: vm.password
                }
            };

            $http.post(configHttp.url, configHttp.data)
                .then(loginSuccess)
                .catch(loginError);

            function loginSuccess(response) {
                authToken.setToken(response.data.token);
                $state.go('main');
            }

            function loginError() {
                Flash.create('danger', "Dados informados inválidos.");
            }
        }
    }

} ());