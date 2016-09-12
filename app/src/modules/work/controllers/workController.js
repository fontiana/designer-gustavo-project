(function () {
    'use strict';

    angular
        .module('baseApp.work')
        .controller('workCtrl', workCtrl)

    workCtrl.$inject = ["$http", "appSettings"];

    /** @ngInject */
    function workCtrl($http, appSettings) {
        var vm = this;
        init();

        function init() {
            loadCategories();
            loadWorks();
        }

        function loadCategories() {

        }

        function loadWorks() {
            $http.get(appSettings.comunicacao.urlBackend + 'work')
                .then(workSuccess)
                .catch(workError);

            function workSuccess(response) {
                vm.works = response.data;
            }

            function workError(msg) {
                console.log(msg);
            }
        }
    }

} ());