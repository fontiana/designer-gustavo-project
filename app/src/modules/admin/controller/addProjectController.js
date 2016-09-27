(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addProjectCtrl', addProjectCtrl)

    addProjectCtrl.$inject = ["projectServices", "categoryServices", "fileUpload", "cfpLoadingBar"];

    /** @ngInject */
    function addProjectCtrl(projectServices, categoryServices, fileUpload, cfpLoadingBar) {
        var vm = this;
        var imagens = [];

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
                fileUpload.loadFilePromise(file);
                cfpLoadingBar.start();
                imagens.push(file.name);
                vm.imagens.push("uploads/" + file.name);
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