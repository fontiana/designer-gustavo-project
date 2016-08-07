(function () {
    'use strict';

    baseAppConfig.$inject = ['$locationProvider', '$routeProvider'];

    function baseAppConfig($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/work', {
                templateUrl: '/work/views/work.html',
                controller: 'workCtrl'
            }).
            when('/work/:workId', {
                templateUrl: '/work/views/work-detail.html',
                controller: 'workCtrl'
            }).
            when('/about', {
                templateUrl: '/about/views/about.html',
                controller: 'workCtrl'
            }).
            when('/email', {
                templateUrl: '/email/views/email.html',
                controller: 'workCtrl'
            }).
            when('/admin', {
                templateUrl: '/admin/views/admin.html',
                controller: 'workCtrl'
            }).
            otherwise('/work');
    }

    angular.module('baseApp', [
        'ngRoute',
        'baseApp.about',
        'baseApp.email',
        'baseApp.work'
    ]).config(baseAppConfig);

} ());