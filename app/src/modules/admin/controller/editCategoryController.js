(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('editCategoryCtrl', editCategoryCtrl)

    editCategoryCtrl.$inject = ["categoryServices", "$stateParams"];

    function editCategoryCtrl(categoryServices, $stateParams) {
        var vm = this;

        vm.save = save;

        init();

        function init() {
            console.log($stateParams.categoryId);
            vm.categoryId = $stateParams.categoryId;
            categoryServices.getCategoryById(vm.categoryId)
                .then(function (response) {
                    vm.description = response.data.CATEGORY_DESCRIPTION;
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function save() {
            var parameters = {
                description: vm.description
            };

            categoryServices.insertCategory(vm.categoryId, parameters)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }
    }

} ());