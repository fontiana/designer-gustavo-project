(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('projectsCtrl', projectsCtrl)

    projectsCtrl.$inject = ["$http", "API", "$state", "authToken"];

    /** @ngInject */
    function projectsCtrl($http, API, $state, authToken) {
        var vm = this;

        init();

        function init() {
            var isAuthenticated = authToken.isAuthenticated();

            if (!isAuthenticated) {
                $state.go('login');
            }

            loadProjects();
        }

        function loadProjects() {
            $http.get(API + 'work')
                .then(workSuccess)
                .catch(workError);

            function workSuccess(response) {
                var projects = [];
                angular.forEach(response.data, function(value, key) {
                    value.hiperlink = "#admin/projects/edit/" + value.WORK_ID;
                    projects.push(value);
                });

                vm.projects = projects;
            }

            function workError(msg) {
                console.log(msg);
            }
        }
    }

} ());