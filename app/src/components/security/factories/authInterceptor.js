(function () {
    'use strict';

    angular
        .module('baseApp.security')
        .factory('authInterceptor', authInterceptor)

    authInterceptor.$inject = ['authToken'];

    function authInterceptor(authToken) {
        return {
            request: request,
            response: response
        }

        function request(config) {
            var token = authToken.getToken();

            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }

        function response(response) {
            return response;
        }
    }

} ());