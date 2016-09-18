(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('editProjectCtrl', editProjectCtrl)

    editProjectCtrl.$inject = ["projectServices", "categoryServices", "$stateParams"];

    /** @ngInject */
    function editProjectCtrl(projectServices, categoryServices, $stateParams) {
        var vm = this;

        vm.title = "Editar Projeto";
        vm.save = save;
        init();

        function init() {
            vm.projectId = $stateParams.projectId;
            projectServices.getProjectById(vm.projectId)
                .then(function (response) {
                    vm.name = response.data.WORK_NAME;
                    vm.description = response.data.WORK_DESCRIPTION;
                    vm.categoryId = response.data.CATEGORY_ID;
                    categoryServices.getCategories()
                        .then(function (response) {
                            vm.categories = response.data;
                        });
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function save() {

        }
    }

} ());