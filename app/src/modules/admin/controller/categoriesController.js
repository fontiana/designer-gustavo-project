(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('categoriesCtrl', categoriesCtrl)

    categoriesCtrl.$inject = ["categoryServices"];

    /** @ngInject */
    function categoriesCtrl(categoryServices) {
        var vm = this;
        vm.deleteCategory = deleteCategory;

        init();

        function init() {
            categoryServices.getCategories()
                .then(function (response) {
                    vm.categories = response.data;
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function deleteCategory(categoryId) {
            categoryServices.deleteCategory(categoryId)
                .then(function (response) {
                    $state.reload();
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

    }

} ());