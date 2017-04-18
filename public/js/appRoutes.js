angular.module('appRoutes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $rootScope) {

    $urlRouterProvider.when('/', '/login').otherwise('/')

    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'views/login.html'
    }).state('home', {
        url: '/home',
        controller: 'MainController',
        templateUrl: 'views/home.html',

    }).state('location', {
        url: '/location',
        controller: 'LocationController',
        templateUrl: 'views/location.html',
    }).state('signup', {
        url: '/signup',
        controller: 'SignupController',
        templateUrl: 'views/signup.html',
    }).state('allSearch', {
        url: '/allSearch',
        controller: 'AllSearchController',
        templateUrl: 'views/allsearch.html',
        resolve: {
            allSearches: ['Location', '$state', function (Location, $state) {
                return Location.getAllSearches().then(function (success) {
                    return success;
                }, function (error) {
                    $state.go("login");
                })

            }]

        }
    });

}]);
