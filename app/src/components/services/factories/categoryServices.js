(function () {
    'use strict';

    angular
        .module('baseApp.services')
        .factory('categoryServices', categoryServices)

    categoryServices.$ngInject = ["$http", "appSettings"];

    /** @ngInject */
    function categoryServices($http, appSettings) {

        return {
            getCategories: getCategories,
            insertCategory: insertCategory,
            updateCategory: updateCategory,
            deteleCategory: deleteCategory
        }

        function getCategory() {
            return $http.get(appSettings.comunicacao.urlBackend + 'category');
        }

        function insertCategory(parameters) {
            return $http.post(appSettings.comunicacao.urlBackend + 'category', { data: parameters });
        }

        function updateCategory(parameters) {
            return $http.put(appSettings.comunicacao.urlBackend + 'category', { data: parameters });
        }

        function deteleCategory(categoryId) {
            return $http.delete(appSettings.comunicacao.urlBackend + 'category' + "/" + categoryId);
        }
    }

} ());