(function () {
    'use strict';

    angular
        .module('baseApp.work')
        .controller('workDetailCtrl', workDetailCtrl)

    workDetailCtrl.$inject = ['$stateParams', 'projectServices'];

    /** @ngInject */
    function workDetailCtrl($stateParams, projectServices) {
        var vm = this;

        init();

        function init() {
            vm.projectId = $stateParams.id;
            vm.imagens = [];
            projectServices.getProjectById(vm.projectId)
                .then(function (response) {
                    vm.categoryId = response.data.CATEGORY_ID;
                    vm.title = response.data.WORK_NAME;
                    vm.description = response.data.WORK_DESCRIPTION;
                    angular.forEach(response.data.imagens, function (imagem) {
                        vm.imagens.push("uploads/" + imagem.IMAGE_NAME);
                    });
                })
                .catch(function (msg) {
                    console.log(msg);
                });
        }

    }

} ());