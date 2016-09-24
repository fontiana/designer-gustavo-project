(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('manageConfigCtrl', manageConfigCtrl)



    function manageConfigCtrl() {
        var vm = this;
        vm.save = save;
        init();

        function init() {
        }

        function save() {

        }
    }

} ());