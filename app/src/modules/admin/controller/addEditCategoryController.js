(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addEditCategoryCtrl', addEditProjectCtrl)

    addEditProjectCtrl.$inject = ["categoryServices"];

    function addEditProjectCtrl(categoryServices) {
        var vm = this;

        init();

        function init() {
        }

    }

} ());