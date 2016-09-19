(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('categoriesCtrl', categoriesCtrl)

    categoriesCtrl.$inject = ["categoryServices", "$state"];

    /** @ngInject */
    function categoriesCtrl(categoryServices, $state) {
        var vm = this;
        vm.deleteCategory = deleteCategory;

        init();

        function init() {
            categoryServices.getCategories()
                .then(function (response) {
                    var categories = [];
                    angular.forEach(response.data, function (category) {
                        category.hiperlink = "#admin/category/edit/" + category.CATEGORY_ID;
                        categories.push(category);
                    });

                    vm.categories = categories;
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function deleteCategory(categoryId) {
            categoryServices.deleteCategory(categoryId)
                .then(function () {
                    $state.reload();
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

    }

} ());