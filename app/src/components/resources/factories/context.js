(function () {
    'use strict';

    angular
        .module('baseApp.resources')
        .factory('context', context)

    context.$inject = ["$window"];

    function context($window) {
        var storage = $window.localStorage;

        return {
            addNewContextValue: addNewContextValue,
            getContextValue: getContextValue
        }

        function addNewContextValue(key, value) {
            storage.setItem(key, value);
        }

        function getContextValue(key) {
            return storage.getItem(key);
        }
    }

} ());