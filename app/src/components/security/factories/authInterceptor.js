(function () {
    'use strict';

    angular
        .module('baseApp.security')
        .factory('authInterceptor', authInterceptor)

    authInterceptor.$inject = ['authToken', 'context'];

    function authInterceptor(authToken, context) {
        return {
            request: request,
            response: response
        }

        function request(config) {
            var token = authToken.getToken();
            
            config.headers["amc-sessionId"] = context.getContextValue("sessionId");
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