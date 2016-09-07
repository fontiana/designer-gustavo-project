(function(){
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addEditProjectCtrl', addEditProjectCtrl)

    /** @ngInject */
    function addEditProjectCtrl(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());