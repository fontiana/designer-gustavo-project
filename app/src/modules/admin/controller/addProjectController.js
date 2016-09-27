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
        vm.uploadFiles = uploadFiles;
        vm.imagens = [];
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

        function uploadFiles(projectImages, errFiles) {
            vm.projectImages = projectImages;
            vm.errFiles = errFiles;
            angular.forEach(projectImages, function (file) {
                fileUpload.loadFile(file);
                imagens.push(file.name);
            });
        }

        function save() {
            fileUpload.loadFile(vm.coverImage);

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