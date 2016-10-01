(function () {
    'use strict';

    angular
        .module('baseApp.about')
        .controller('aboutCtrl', aboutCtrl)

    aboutCtrl.$inject = ["aboutServices", "appSettings"];

    /** @ngInject */
    function aboutCtrl(aboutServices, appSettings) {
        var vm = this;

        init();

        function init() {
            aboutServices.getAbout()
                .then(function (response) {
                    vm.description = response.data.ABOUT_DESCRIPTION;
                    vm.title = response.data.ABOUT_TITLE;
                    vm.banner = appSettings.configuracao.caminhoImages + "/" + response.data.ABOUT_IMAGE;
                });
        }
    }

} ());