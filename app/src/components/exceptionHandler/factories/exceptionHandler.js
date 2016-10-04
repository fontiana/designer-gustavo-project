(function () {
    'use strict';

    angular
        .module('baseApp.exception')
        .factory('$exceptionHandler', exceptionHandler)

    exceptionHandler.$inject = ["$log"];

    function exceptionHandler($log) {
        return function handException(excecao) {
            $log.error(excecao);
        }
    }

} ());