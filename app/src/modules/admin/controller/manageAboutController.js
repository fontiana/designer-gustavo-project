(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('manageAboutCtrl', manageAboutCtrl)

    manageAboutCtrl.$inject = ['aboutServices', 'fileUpload', "Flash"];

    function manageAboutCtrl(aboutServices, fileUpload, Flash) {
        var vm = this;

        vm.save = save;
        init();

        function init() {
            aboutServices.getAbout()
                .then(function (response) {
                    vm.title = response.data.ABOUT_TITLE;
                    vm.coverImage = {
                        name: response.data.ABOUT_IMAGE
                    };
                    vm.description = response.data.ABOUT_DESCRIPTION;
                    vm.aboutId = response.data.ABOUT_ID;
                })
                .catch(function () {
                    Flash.create('danger', "Erro ao carregar informações.");
                });
        }

        function save() {
            fileUpload.loadFilePromise(vm.coverImage)
                .then(function () {
                    var parameters = {
                        title: vm.title,
                        aboutImage: vm.coverImage.name,
                        description: vm.description,
                        id: vm.aboutId
                    };

                    aboutServices.updateAbout(vm.aboutId, parameters)
                        .then(function () {
                            Flash.create('success', "Página sobre atualizada com sucesso.");
                        })
                        .catch(function () {
                            Flash.create('danger', "Erro ao atualizar a página sobre.");
                        });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                });
        }
    }
} ());