(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('manageConfigCtrl', manageConfigCtrl)

    manageConfigCtrl.$inject = ["configServices"];

    function manageConfigCtrl(configServices) {
        var vm = this;
        vm.save = save;
        init();

        function init() {
            configServices.getConfig()
                .then(function (response) {
                    vm.email = response.data.EMAIL_ADDRESS;
                    vm.logo = response.data.LOGO_IMAGE;
                    vm.id = response.data.CONFIG_ID;
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function save() {
            var parameters = {
                email: vm.email,
                logo: vm.logo.name
            };
            configServices.updateConfig(vm.id, parameters)
                .then(function () {
                    console.log("Sucesso");
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }
    }

} ());