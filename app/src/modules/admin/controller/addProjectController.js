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
        vm.removeImage = removeImage;
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

        function removeImage(imageName) {
            vm.imagens = vm.imagens.filter(function (name) {
                return name !== imageName;
            });
            // imageName = imageName.indexOf("uploads/");
            // imagens = imagens.filter(function (name) {
            //     return name !== imageName;
            // });
        }

        function uploadFiles(files) {
            angular.forEach(files, function (file) {
                vm.isLoading = true;
                cfpLoadingBar.start();
                cfpLoadingBar.inc();
                fileUpload.loadFilePromise(file)
                    .then(function (resp) {
                        imagens.push(file.name);
                        vm.imagens.push("uploads/" + file.name);
                        cfpLoadingBar.complete();
                        vm.isLoading = false;
                    }, function (resp) {
                        cfpLoadingBar.complete();
                        vm.isLoading = false;
                    });
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