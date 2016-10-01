(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('manageConfigCtrl', manageConfigCtrl)

    manageConfigCtrl.$inject = ["configServices", "Flash"];

    function manageConfigCtrl(configServices, Flash) {
        var vm = this;
        vm.save = save;
        init();

        function init() {
            configServices.getConfig()
                .then(function (response) {
                    vm.email = response.data.EMAIL_ADDRESS;
                    vm.logo = {
                        name: response.data.LOGO_IMAGE
                    };
                    vm.id = response.data.CONFIG_ID;
                })
                .catch(function () {
                    Flash.create('danger', "Erro ao carregar informações.");
                });
        }

        function save() {
            var parameters = {
                email: vm.email,
                logo: vm.logo.name
            };
            configServices.updateConfig(vm.id, parameters)
                .then(function () {
                    Flash.create('success', "Configuraçoes atualizadas com sucesso.");
                })
                .catch(function () {
                    Flash.create('danger', "Erro ao atualizar o configuraçoes.");
                });
        }
    }

} ());