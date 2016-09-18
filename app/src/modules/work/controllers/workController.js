(function () {
    'use strict';

    angular
        .module('baseApp.work')
        .controller('workCtrl', workCtrl)

    workCtrl.$inject = ["projectServices"];

    /** @ngInject */
    function workCtrl(projectServices) {
        var vm = this;
        init();

        function init() {
            loadCategories();
            loadWorks();
        }

        function loadCategories() {
        }

        function loadWorks() {
           projectServices.getProjects()
                .then(workSuccess)
                .catch(workError);

            function workSuccess(response) {
                vm.works = response.data;
            }

            function workError(msg) {
                console.log(msg);
            }
        }
    }

} ());