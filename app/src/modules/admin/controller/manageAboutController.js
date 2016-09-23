(function(){
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('manageAboutCtrl', manageAboutCtrl)

    /** @ngInject */
    function manageAboutCtrl(){
        var vm = this;

        vm.save = save;

        init();

        function init(){
        }

        function save() {
            
        }

    }

}());