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
            vm.categoryId = $stateParams.categoryId;
            categoryServices.getCategoryById(category)
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

            categoryServices.insertCategory(vm.categoryId, description)
                .then(function (response) {
                    console.log(msg);
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }
    }

} ());