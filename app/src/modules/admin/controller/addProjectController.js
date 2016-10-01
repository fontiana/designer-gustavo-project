(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addProjectCtrl', addProjectCtrl)

    addProjectCtrl.$inject = ["projectServices", "categoryServices", "fileUpload", "cfpLoadingBar", "Flash"];

    function addProjectCtrl(projectServices, categoryServices, fileUpload, cfpLoadingBar, Flash) {
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
                .catch(function () {
                    Flash.create('danger', "Erro ao carregar categorias.");
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
                    .then(function () {
                        imagens.push(file.name);
                        vm.imagens.push("uploads/" + file.name);
                        cfpLoadingBar.complete();
                        vm.isLoading = false;
                    }, function () {
                        cfpLoadingBar.complete();
                        vm.isLoading = false;
                        Flash.create('danger', "Erro carregar arquivo.");
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
                .then(function () {
                    Flash.create('success', "Projeto salvo com sucesso.");
                })
                .catch(function () {
                    Flash.create('danger', "Erro ao inserir projeto.");
                });
        }
    }

} ());