var ngApp = angular.module('ngApp', ['ngRoute', 'ngAppControllers', 'chart.js', 'leaflet-directive']);

ngApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: './static/partials/home.html',
        controller: 'homeController'
      }).
      when('/map', {
        templateUrl: './static/partials/map.html',
        controller: 'mapController'
      }).
      when('/attribution', {
        templateUrl: './static/partials/attribution.html',
        controller: 'indexController'
      }).
      when('/home/:name', {
        templateUrl: './static/partials/urlParm.html',
        controller: 'urlParamsController'
      }).
      otherwise({
        redirectTo: '/home'
      });
}]);