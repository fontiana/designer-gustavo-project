(function () {
    'use strict';

    angular
        .module('baseApp.work')
        .controller('workDetailCtrl', workDetailCtrl)

    workDetailCtrl.$inject = ['$stateParams', 'projectServices'];

    /** @ngInject */
    function workDetailCtrl($stateParams, projectServices) {
        var vm = this;

        init();

        function init() {
            vm.projectId = $stateParams.id;

            projectServices.getProjectById(vm.projectId)
                .then(function (response) {
                    vm.categoryId = response.data.CATEGORY_ID;
                    vm.title = response.data.WORK_NAME;
                    vm.description = response.data.WORK_DESCRIPTION;
                    // vm.imagens = response.data.imagens;
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

    }

} ());