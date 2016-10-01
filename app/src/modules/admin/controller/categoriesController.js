(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('categoriesCtrl', categoriesCtrl)

    categoriesCtrl.$inject = ["categoryServices", "$state", "Flash"];

    /** @ngInject */
    function categoriesCtrl(categoryServices, $state, Flash) {
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
                .catch(function () {
                    Flash.create('danger', "Erro ao recuperar categorias.");
                });
        }

        function deleteCategory(categoryId) {
            categoryServices.deleteCategory(categoryId)
                .then(function () {
                    $state.reload();
                })
                .catch(function () {
                    Flash.create('danger', "Erro ao deletar categoria.");
                });
        }

    }

} ());