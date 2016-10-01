(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('editProjectCtrl', editProjectCtrl)

    editProjectCtrl.$inject = ["projectServices", "categoryServices", "$stateParams", "fileUpload", "cfpLoadingBar", "Flash"];

    /** @ngInject */
    function editProjectCtrl(projectServices, categoryServices, $stateParams, fileUpload, cfpLoadingBar, Flash) {
        var vm = this;
        var imagens = [];

        vm.title = "Editar Projeto";
        vm.save = save;
        vm.uploadFiles = uploadFiles;
        vm.removeImage = removeImage;
        vm.imagens = [];
        init();

        function init() {
            vm.projectId = $stateParams.projectId;
            categoryServices.getCategories()
                .then(function (response) {
                    vm.categories = response.data;
                    projectServices.getProjectById(vm.projectId)
                        .then(function (response) {
                            vm.name = response.data.WORK_NAME;
                            vm.description = response.data.WORK_DESCRIPTION;
                            vm.categoryId = response.data.CATEGORY_ID;
                            vm.workId = response.data.WORK_ID;
                            vm.coverImage = {
                                name: response.data.WORK_COVER_IMAGE
                            };
                            angular.forEach(response.data.imagens, function (imagem) {
                                vm.imagens.push("uploads/" + imagem.IMAGE_NAME);
                                imagens.push(imagem.IMAGE_NAME);
                            });
                        })
                        .catch(function () {
                            Flash.create('danger', "Erro carregar categorias.");
                        });
                });
        }

        function removeImage(imageName) {
            vm.imagens = vm.imagens.filter(function (name) {
                return name !== imageName;
            });
        }

        function uploadFiles(files) {
            angular.forEach(files, function (file) {
                vm.isLoading = true;
                cfpLoadingBar.start();
                fileUpload.loadFilePromise(file)
                    .then(function () {
                        imagens.push(file.name);
                        vm.imagens.push("uploads/" + file.name);
                        cfpLoadingBar.complete();
                        vm.isLoading = false;
                    }, function () {
                        cfpLoadingBar.complete();
                        vm.isLoading = false;
                        Flash.create('danger', "Erro ao carregar arquivo.");
                    });
            });
        }

        function save() {
            fileUpload.loadFilePromise(vm.coverImage)
                .then(function () {
                    var parameters = {
                        categoryId: vm.categoryId,
                        name: vm.name,
                        description: vm.description,
                        coverImage: vm.coverImage.name,
                        workId: vm.workId,
                        imagens: imagens
                    };

                    projectServices.updateProject(vm.workId, parameters)
                        .then(function () {
                            Flash.create('success', "Projeto salvo com sucesso.");
                        })
                        .catch(function () {
                            Flash.create('danger', "Erro ao atualizar o projeto.");
                        });
                }, function () {
                    Flash.create('danger', "Erro ao carregar capa. Tente novamente.");
                });
        }
    }

} ());