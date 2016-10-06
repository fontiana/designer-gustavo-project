(function () {
    'use strict';

    baseAppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'FlashProvider'];
    function baseAppConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, FlashProvider) {
        $urlRouterProvider.otherwise('/work');

        // States
        $stateProvider
            .state('default', {
                abstract: true,
                templateUrl: 'tpl.default.html',
            })
            .state('admin', {
                abstract: true,
                templateUrl: 'tpl.admin.html',
            })
            .state('work', {
                parent: "default",
                url: "/work",
                templateUrl: '/work/views/work.html',
                controller: 'workCtrl',
                controllerAs: 'wCtrl'
            })
            .state('workDetail', {
                parent: "default",
                url: "/work/:id",
                templateUrl: '/work/views/work-details.html',
                controller: 'workDetailCtrl',
                controllerAs: 'wdCtrl'
            })
            .state('about', {
                parent: "default",
                url: "/about",
                templateUrl: '/about/views/about.html',
                controller: 'aboutCtrl',
                controllerAs: 'aCtrl'
            })
            .state('main', {
                parent: "admin",
                url: "/admin",
                templateUrl: '/admin/views/main.html',
                controller: 'mainCtrl',
                controllerAs: 'mCtrl'
            })
            .state('login', {
                url: "/admin/login",
                templateUrl: '/admin/views/login.html',
                controller: 'loginCtrl',
                controllerAs: 'lCtrl'
            })
            .state('logout', {
                url: "/admin/logout",
                controller: 'logoutCtrl',
            })
            .state('projects', {
                parent: "admin",
                url: "/admin/projects",
                templateUrl: '/admin/views/projects.html',
                controller: 'projectsCtrl',
                controllerAs: 'pCtrl'
            })
            .state('addProject', {
                parent: "admin",
                url: "/admin/projects/add",
                templateUrl: '/admin/views/addEditProject.html',
                controller: 'addProjectCtrl',
                controllerAs: 'pCtrl'
            })
            .state('editProject', {
                parent: "admin",
                url: "/admin/projects/edit/:projectId",
                templateUrl: '/admin/views/addEditProject.html',
                controller: 'editProjectCtrl',
                controllerAs: 'pCtrl'
            })
            .state('categories', {
                parent: "admin",
                url: "/admin/categories",
                templateUrl: '/admin/views/categories.html',
                controller: 'categoriesCtrl',
                controllerAs: 'cCtrl'
            })
            .state('addCategory', {
                parent: "admin",
                url: "/admin/category/add",
                templateUrl: '/admin/views/addEditCategory.html',
                controller: 'addCategoryCtrl',
                controllerAs: 'cCtrl'
            })
            .state('editCategory', {
                parent: "admin",
                url: "/admin/category/edit/:categoryId",
                templateUrl: '/admin/views/addEditCategory.html',
                controller: 'editCategoryCtrl',
                controllerAs: 'cCtrl'
            })
            .state('manageAbout', {
                parent: "admin",
                url: "/admin/about",
                templateUrl: '/admin/views/about.html',
                controller: 'manageAboutCtrl',
                controllerAs: 'mCtrl'
            })
            .state('manageConfig', {
                parent: "admin",
                url: "/admin/config",
                templateUrl: '/admin/views/config.html',
                controller: 'manageConfigCtrl',
                controllerAs: 'mCtrl'
            });

        $locationProvider.html5Mode(false);
        $httpProvider.interceptors.push('authInterceptor');
        FlashProvider.setTimeout(10000);
        FlashProvider.setShowClose(true);
        $httpProvider.defaults.cache = false;
    }

    baseAppRun.$inject = ['$rootScope', 'Flash', 'context', 'utilities'];
    function baseAppRun($rootScope, Flash, context, utilities) {
        if (angular.isUndefined(context.getContextValue("sessionId")) ||
            context.getContextValue("sessionId") === "") {
            var sessionId = utilities.generateGuid();
            context.addNewContextValue("sessionId", sessionId);
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            if (fromState === toState) return;
            Flash.clear();

            // if (toState.match(/(admin)/)) {
            //     var isAuthenticated = authToken.isAuthenticated();
                
            //     if (!isAuthenticated) {
            //         $state.go('login');
            //     }
            // }
        });
    }

    angular.module('baseApp', [
        'ngAnimate',
        'ui.router',
        'baseApp.exception',
        'baseApp.about',
        'baseApp.work',
        'baseApp.admin',
        'baseApp.security',
        'baseApp.services',
        'baseApp.fileUpload',
        'baseApp.resources'
    ])
        .config(baseAppConfig)
        .run(baseAppRun)
        .constant('appSettings', {
            comunicacao: {
                urlBackend: 'http://localhost:8080/',
                urlAdmin: 'http://localhost:8080/admin/'
            },
            configuracao: {
                caminhoImages: "upload"
            }
        });

} ());