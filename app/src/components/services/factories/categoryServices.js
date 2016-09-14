(function () {
    'use strict';

    angular
        .module('baseApp.services')
        .factory('categoryServices', categoryServices)

    categoryServices.$inject = ["$http", "appSettings"];

    function categoryServices($http, appSettings) {
        return {
            getCategories: getCategories,
            insertCategory: insertCategory,
            updateCategory: updateCategory,
            deleteCategory: deleteCategory
        }

        function getCategories() {
            return $http.get(appSettings.comunicacao.urlBackend + 'category');
        }

        function insertCategory(parameters) {
            return $http.post(appSettings.comunicacao.urlBackend + 'category', { data: parameters });
        }

        function updateCategory(parameters) {
            return $http.put(appSettings.comunicacao.urlBackend + 'category', { data: parameters });
        }

        function deleteCategory(categoryId) {
            return $http.delete(appSettings.comunicacao.urlBackend + 'category' + "/" + categoryId);
        }
    }

} ());