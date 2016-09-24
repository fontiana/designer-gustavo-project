(function () {
    'use strict';

    angular
        .module('baseApp.resources')
        .factory('utilities', utilities)

    function utilities() {

        return {
            generateGuid: generateGuid
        }

        function generateGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    }

} ());