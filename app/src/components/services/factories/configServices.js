(function () {
    'use strict';

    angular
        .module('baseApp.services')
        .factory('configServices', configServices)

    configServices.$inject = ["$http", "appSettings"];

    /** @ngInject */
    function configServices($http, appSettings) {

        return {
            getConfig: getConfig,
            updateConfig: updateConfig
        }

        function getConfig() {
            return $http.get(appSettings.comunicacao.urlBackend + 'config');
        }

        function updateConfig(id, data) {
            var params = { params: { id: id } };
            return $http.put(appSettings.comunicacao.urlBackend + 'config' + "/" + id, data, params);
        }
    }

} ());