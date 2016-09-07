(function(){
    'use strict';

    angular
        .module('baseApp.about')
        .controller('aboutCtrl', aboutCtrl)

    /** @ngInject */
    function aboutCtrl(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());