(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addCategoryCtrl', addCategoryCtrl)

    addCategoryCtrl.$inject = ["categoryServices"];

    function addCategoryCtrl(categoryServices) {
        var vm = this;

        vm.save = save;
        vm.description = "";

        function save() {
            var parameters = {
                description: vm.description
            };

            categoryServices.insertCategory(parameters)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }
    }

} ());