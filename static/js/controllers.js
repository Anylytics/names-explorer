var ngAppControllers = angular.module('ngAppControllers', []);


ngAppControllers.controller('homeController', ['$scope','$http', function($scope, $http) {
	//Example of a basic controller, includes ability to make HTTP requests
	$scope.data = "world";
}]);


ngAppControllers.controller('urlParamsController', ['$scope', '$routeParams', function($scope, $routeParams) {
	//Example of a basic controller, includes ability to pull route parameters ($routeParams.name defined in app.js routing configuration)
	$scope.data = $routeParams.name + " from URL parameter";
}]);