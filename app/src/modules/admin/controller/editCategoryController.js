(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('editCategoryCtrl', editCategoryCtrl)

    editCategoryCtrl.$inject = ["categoryServices", "$stateParams"];

    function editCategoryCtrl(categoryServices, $stateParams) {
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
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function save() {
            var parameters = {
                description: vm.description,
                categoryId: vm.categoryId
            };

            categoryServices.updateCategory(vm.categoryId, parameters)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }
    }

} ());