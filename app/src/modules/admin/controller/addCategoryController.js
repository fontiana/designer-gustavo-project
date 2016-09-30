(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addCategoryCtrl', addCategoryCtrl)

    addCategoryCtrl.$inject = ["categoryServices", "Flash"];

    function addCategoryCtrl(categoryServices, Flash) {
        var vm = this;

        vm.save = save;
        vm.title = "Adicionar Categoria";
        vm.description = "";

        function save() {
            var parameters = {
                description: vm.description
            };

            categoryServices.insertCategory(parameters)
                .then(function () {
                    Flash.create('success', "Categoria salva com sucesso.");
                })
                .catch(function () {
                    Flash.create('danger', "Erro ao inserir categoria.");
                });
        }
    }

} ());