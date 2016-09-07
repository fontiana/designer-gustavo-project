(function () {
    'use strict';

    angular
        .module('baseApp.work')
        .controller('workCtrl', workCtrl)

    workCtrl.$inject = ["$http", "API"];

    /** @ngInject */
    function workCtrl($http, API) {
        var vm = this;
        init();

        function init() {
            loadCategories();
            loadWorks();
        }

        function loadCategories() {

        }

        function loadWorks() {
            $http.get(API + 'work')
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