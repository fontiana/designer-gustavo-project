(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('loginCtrl', loginCtrl)

    loginCtrl.$inject = ["$http", "APIAdmin", '$state', 'authToken'];

    /** @ngInject */
    function loginCtrl($http, APIAdmin, $state, authToken) {
        var vm = this;

        vm.login = login;

        function login(email, senha) {
            var configHttp = {
                url: APIAdmin + 'login',
                data: {
                    email: email,
                    senha: senha
                }
            };

            $http.post(configHttp.url, configHttp.data)
                .then(loginSuccess)
                .catch(loginError);

            function loginSuccess(response) {
                authToken.setToken(response.data.token);
                $state.go('main');
            }

            function loginError(msg) {
                console.log('Dados informados inválidos');
            }
        }
    }

} ());