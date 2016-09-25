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
            categoryServices.getCategories()
                .then(function (response) {
                    vm.categories = response.data;
                });
            projectServices.getProjectById(vm.projectId)
                .then(function (response) {
                    vm.name = response.data.WORK_NAME;
                    vm.description = response.data.WORK_DESCRIPTION;
                    vm.categoryId = response.data.CATEGORY_ID;
                    vm.workId = response.data.WORK_ID;
                    vm.coverImage = response.data.coverImage;
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function save() {
            var imagens = [];
            imagens.push(vm.imagens.name);

            var parameters = {
                categoryId: vm.categoryId,
                name: vm.name,
                description: vm.description,
                coverImage: vm.coverImage.name,
                workId: vm.workId,
                imagens: imagens
            };

            projectServices.updateProject(vm.workId, parameters)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }
    }

} ());