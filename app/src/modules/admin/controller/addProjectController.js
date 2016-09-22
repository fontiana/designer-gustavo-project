(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addProjectCtrl', addProjectCtrl)

    addProjectCtrl.$inject = ["projectServices", "categoryServices", "fileUpload"];

    /** @ngInject */
    function addProjectCtrl(projectServices, categoryServices, fileUpload) {
        var vm = this;

        vm.title = "Adicionar projeto";
        vm.save = save;
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

        function save() {
            fileUpload.loadFile(vm.coverImage);
            fileUpload.loadMultipleFiles(vm.imagens);

            var imagens = [];
            imagens.push(vm.imagens.name);

            var parameters = {
                categoryId: vm.categoryId,
                name: vm.name,
                description: vm.description,
                coverImage: vm.coverImage.name,
                imagens: imagens
            };

            projectServices.insertProject(parameters)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }
    }

} ());