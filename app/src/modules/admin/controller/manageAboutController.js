(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('manageAboutCtrl', manageAboutCtrl)

    manageAboutCtrl.$inject = ['aboutServices'];

    function manageAboutCtrl(aboutServices) {
        var vm = this;

        vm.save = save;
        init();

        function init() {
            aboutServices.getAbout()
                .then(function (response) {
                    vm.title = response.data.ABOUT_TITLE;
                    vm.coverImage = response.data.ABOUT_IMAGE;
                    vm.description = response.data.ABOUT_DESCRIPTION;
                    vm.aboutId = response.data.ABOUT_ID;
                    console.log(vm.aboutId);
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function save() {
            var parameters = {
                title = vm.title,
                aboutImage = vm.coverImage,
                description = vm.description,
                id = vm.aboutId
            };
            console.log(vm.aboutId);

            aboutServices.updateAbout(vm.aboutId, parameters)
                .then(function(response) {
                    console.log("Sucesso");
                })
                .catch(function(msg) {
                    console.log(msg);
                });
        }

    }

} ());