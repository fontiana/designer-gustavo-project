(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('projectsCtrl', projectsCtrl)

    projectsCtrl.$inject = ["$http", "appSettings", "$state", "authToken"];

    /** @ngInject */
    function projectsCtrl($http, appSettings, $state, authToken) {
        var vm = this;

        vm.deleteProject = deleteProject;

        init();

        function init() {
            var isAuthenticated = authToken.isAuthenticated();

            if (!isAuthenticated) {
                $state.go('login');
            }

            loadProjects();
        }

        function loadProjects() {
            $http.get(appSettings.comunicacao.urlBackend + 'work')
                .then(workSuccess)
                .catch(workError);

            function workSuccess(response) {
                var projects = [];
                angular.forEach(response.data, function (project) {
                    project.hiperlink = "#admin/projects/edit/" + project.WORK_ID;
                    projects.push(project);
                });

                vm.projects = projects;
            }

            function workError(msg) {
                console.log(msg);
            }
        }

        function deleteProject(projectId) {
            var params = { params: { projectId: projectId } };
            $http.delete(appSettings.comunicacao.urlBackend + 'delete/' + projectId, params)
                .then(workSuccess)
                .catch(workError);

            function workSuccess() {
                $state.reload();
            }

            function workError(msg) {
                console.log(msg);
            }
        }
    }

} ());