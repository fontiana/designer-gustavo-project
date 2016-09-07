(function () {
    'use strict';

    angular
        .module('baseApp.security')
        .factory('authToken', authToken)

    authToken.$inject = ["$window"];

    /** @ngInject */
    function authToken($window) {
        var storage = $window.localStorage;
        var cachedToken;
        var userToken = 'userToken';

        return {
            setToken: setToken,
            getToken: getToken,
            isAuthenticated: isAuthenticated,
            removeToken: removeToken
        }

        function setToken(token) {
            cachedToken = token;
            storage.setItem(userToken, token);
        }

        function getToken() {
            if (!cachedToken) {
                cachedToken = storage.getItem(userToken);
            }
            return cachedToken;
        }

        function isAuthenticated() {
            return !!getToken();
        }

        function removeToken() {
            cachedToken = null;
            storage.removeItem(userToken);
        }
    }

} ());