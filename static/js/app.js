var ngApp = angular.module('ngApp', ['ngRoute', 'ngAppControllers', 'chart.js', 'leaflet-directive']);

ngApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: './static/partials/home.html',
        controller: 'homeController',
        reloadOnSearch: false
      }).
      when('/histogram', {
        templateUrl: './static/partials/names_histogram.html',
        controller: 'histController'
      }).
      when('/disrupt', {
        templateUrl: './static/partials/disrupt.html',
        controller: 'disruptController'
      }).
      when('/map', {
        templateUrl: './static/partials/map.html',
        controller: 'mapController'
      }).
      when('/state_names', {
        templateUrl: './static/partials/state_names.html',
        controller: 'stateNamesController'
      }).
      when('/attribution', {
        templateUrl: './static/partials/attribution.html',
        controller: 'indexController'
      }).
      when('/home/:name', {
        templateUrl: './static/partials/home.html',
        controller: 'homeController',
        reloadOnSearch: false
      }).
      otherwise({
        redirectTo: '/home'
      });
}]);
