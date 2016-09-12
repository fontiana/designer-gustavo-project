(function(){
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('addEditCategoryCtrl', addEditProjectCtrl)

    /** @ngInject */
    function addEditProjectCtrl(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());