(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('projectsCtrl', projectsCtrl)

    projectsCtrl.$inject = ["projectServices","$state", "authToken"];

    /** @ngInject */
    function projectsCtrl(projectServices, $state, authToken) {
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
            projectServices.getProjects()
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
            projectServices.deleteProject(projectId)
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