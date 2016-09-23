(function () {
    'use strict';

    angular
        .module('baseApp.services')
        .factory('aboutServices', aboutServices)

    aboutServices.$inject = ["$http", "appSettings"];

    /** @ngInject */
    function aboutServices($http, appSettings) {

        return {
            getAbout: getAbout,
            updateAbout: updateAbout
        }

        function getAbout() {
            return $http.get(appSettings.comunicacao.urlBackend + 'about');
        }

        function updateAbout(id, data) {
            var params = { params: { id: id } };
            return $http.put(appSettings.comunicacao.urlBackend + 'about' + "/" + id, data, params);
        }
    }

} ());