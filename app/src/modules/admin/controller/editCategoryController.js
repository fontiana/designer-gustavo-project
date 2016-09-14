(function () {
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('editCategoryCtrl', editCategoryCtrl)

    editCategoryCtrl.$inject = ["categoryServices"];

    function editCategoryCtrl(categoryServices) {
        var vm = this;

        init();

        function init() {
        }

    }

} ());