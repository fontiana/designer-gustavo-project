(function(){
    'use strict';

    angular
        .module('baseApp.admin')
        .controller('categoriesCtrl', categoriesCtrl)

    /** @ngInject */
    function categoriesCtrl(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());