(function () {
    'use strict';

    angular
        .module('baseApp.about')
        .controller('aboutCtrl', aboutCtrl)

    aboutCtrl.$inject = ["aboutServices"];

    /** @ngInject */
    function aboutCtrl(aboutServices) {
        var vm = this;

        init();

        function init() {
            aboutServices.getAbout()
                .then(function () {
                    vm.description = "";
                    vm.banner = "";
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }
    }

} ());