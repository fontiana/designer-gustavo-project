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
            deleteCategory: deleteCategory,
            getCategoryById: getCategoryById
        }

        function getCategories() {
            return $http.get(appSettings.comunicacao.urlBackend + 'category');
        }

        function insertCategory(data) {
            return $http.post(appSettings.comunicacao.urlBackend + 'category', data);
        }

        function updateCategory(categoryId, data) {
            var params = { params: { categoryId: categoryId } };
            return $http.put(appSettings.comunicacao.urlBackend + 'category' + "/" + categoryId, data, params);
        }

        function deleteCategory(categoryId) {
            var params = { params: { categoryId: categoryId } };
            return $http.delete(appSettings.comunicacao.urlBackend + 'category' + "/" + categoryId, params);
        }

        function getCategoryById(categoryId) {
            var params = { params: { categoryId: categoryId } };
            return $http.get(appSettings.comunicacao.urlBackend + 'category', + "/" + categoryId, params);
        }
    }

} ());