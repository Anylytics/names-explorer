var ngApp = angular.module('ngApp', ['ngRoute', 'ngAppControllers']);

ngApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: './static/partials/home.html',
        controller: 'homeController'
      }).
      when('/home/:name', {
        templateUrl: './static/partials/home.html',
        controller: 'urlParamsController'
      }).
      otherwise({
        redirectTo: '/home'
      });
}]);