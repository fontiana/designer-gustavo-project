(function(){
    'use strict';

    angular
        .module('baseApp.email')
        .controller('emailCtrl', emailCtrl)

    /** @ngInject */
    function emailCtrl(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());