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
                    console.log(response);
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

        function save() {

        }

    }

} ());