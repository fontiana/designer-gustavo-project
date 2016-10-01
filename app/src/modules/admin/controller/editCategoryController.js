(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('editCategoryCtrl', editCategoryCtrl)

    editCategoryCtrl.$inject = ["categoryServices", "$stateParams", "Flash"];

    function editCategoryCtrl(categoryServices, $stateParams, Flash) {
        var vm = this;

        vm.save = save;
        vm.title = "Editar Categoria";
        init();

        function init() {
            vm.categoryId = $stateParams.categoryId;
            categoryServices.getCategoryById(vm.categoryId)
                .then(function (response) {
                    vm.description = response.data.CATEGORY_DESCRIPTION;
                    vm.categoryId = response.data.CATEGORY_ID;
                })
                .catch(function () {
                    Flash.create('danger', "Erro ao carregar informações.");
                });
        }

        function save() {
            var parameters = {
                description: vm.description,
                categoryId: vm.categoryId
            };

            categoryServices.updateCategory(vm.categoryId, parameters)
                .then(function () {
                    Flash.create('success', "Categoria salva com sucesso.");
                })
                .catch(function () {
                    Flash.create('danger', "Erro ao atualizar categoria.");
                });
        }
    }

} ());