(function () {
    'use strict';

    angular
        .module('baseApp.services')
        .factory('projectServices', projectServices)

    projectServices.$inject = ["$http", "appSettings"];

    function projectServices($http, appSettings) {
        return {
            getProjects: getProjects,
            insertProject: insertProject,
            updateProject: updateProject,
            deleteProject: deleteProject,
            getProjectById: getProjectById
        }

        function getProjects() {
            return $http.get(appSettings.comunicacao.urlBackend + 'work');
        }

        function insertProject(data) {
            return $http.post(appSettings.comunicacao.urlBackend + 'work', data);
        }

        function updateProject(projectId, data) {
            var params = { params: { projectId: projectId } };
            return $http.put(appSettings.comunicacao.urlBackend + 'work' + "/" + projectId, data, params);
        }

        function deleteProject(projectId) {
            var params = { params: { projectId: projectId } };
            return $http.delete(appSettings.comunicacao.urlBackend + 'work' + "/" + projectId, params);
        }

        function getProjectById(projectId) {
            var params = { params: { projectId: projectId } };
            return $http.get(appSettings.comunicacao.urlBackend + 'work', + "/" + projectId, params);
        }
    }

} ());