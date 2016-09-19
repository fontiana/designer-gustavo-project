(function(){
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addProjectCtrl', addProjectCtrl)

    /** @ngInject */
    function addProjectCtrl(){
        var vm = this;
        
        vm.title = "Adicionar projeto";
        vm.save = save;
        init();

        function init(){
        }

        function save() {

        }
    }

}());