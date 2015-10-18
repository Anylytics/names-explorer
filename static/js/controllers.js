var ngAppControllers = angular.module('ngAppControllers', []);


ngAppControllers.controller('homeController', ['$scope','$http', function($scope, $http) {

	$scope.year_min = 1990;
	$scope.year_max = 2014;
	$scope.selectedName = "";
	$scope.loadingHist = false;
	$scope.loadingSettings = false;
	$scope.histByYear_labels = [];
	$scope.histByYear_data = [];
	$scope.labels = [];
	$scope.series = ['Male', 'Female'];

	$scope.data = [];



	$('#autocomplete_histName').autocomplete({
		lookup: function (query, done) {
			$scope.loadingSettings = true;
			$.ajax({
				url: "./names_suggest/"+query,
				dataType: "json",
				success: function(result) {
					$scope.loadingSettings = false;
					done(result);
				}
			});

		},
		onSelect: function (suggestion) {
			$scope.generateChart();
		}
	});

	$scope.getNames = function(yearVal) {

		$http.get('./getNamesByYear/'+yearVal).success(function(data) {
			$scope.names = data.names;
		});

	};

	$scope.generateChart = function() {
		var tmpData = $scope.getFrequencyByYear($scope.selectedName);
		Materialize.toast("Fetching data...",1000);
	}

	$scope.getFrequencyByYear = function(nameVal) {
		//Look into doing name wars, male vs female, http://underscorejs.org/
		$scope.loadingHist = true;
		$http.get('./getFrequencyOfName/'+nameVal+'/'+$scope.year_min+'/'+$scope.year_max+'/'+"M").success(function(data) {
			$scope.loadingHist = false;
			$scope.updateHistogram(data);

		});


	};

	$scope.updateHistogram = function(data) {

		$scope.labels = [];
		$scope.data = [[]];
		var tmpYearRange = $scope.year_max - $scope.year_min;
		var tmpYearMin = parseInt($scope.year_min);
		var n = 0;
		for (i=0; i<tmpYearRange+1; i++) {
			$scope.labels.push(parseInt(tmpYearMin));
			if (parseInt(data.names[n].year)==tmpYearMin) {
				$scope.data[0].push(data.names[n].frequency);
				n+=1;
			} else {
				$scope.data[0].push(0);			
			}
			tmpYearMin++;
		}
	};

	//Histogram - Frequency of Name by Year
	var histByYearSlider = document.getElementById('histByYear_slider');
	noUiSlider.create(histByYearSlider, {
		start: [$scope.year_min, $scope.year_max],
		connect: true,
		step: 1,
		range: {
			'min': 1910,
			'max': 2014
		},
		format: wNumb({
			decimals: 0
		})
	});

	histByYearSlider.noUiSlider.on('update', function( values, handle ) {
		if ( handle ) {
			$scope.year_max = values[handle];
		} else {
			$scope.year_min = values[handle];
		}
		if(!$scope.$$phase) {
			$scope.$apply();
		}
	});


}]);


ngAppControllers.controller('urlParamsController', ['$scope', '$routeParams', function($scope, $routeParams) {
	//Example of a basic controller, includes ability to pull route parameters ($routeParams.name defined in app.js routing configuration)
	$scope.data = $routeParams.name + " from URL parameter";
}]);

ngAppControllers.controller('mapController', ['$scope', '$http', function($scope, $http) {

	$scope.geojson_states = {};
	$scope.center = {
		lat:39.0997,
		lng:-94.5783,
		zoom:5
	}

	$scope.loadGeo = function() {
		$http.get('./static/js/geo/us_states.JSON').success(function(data) {
			$scope.geojson_states.data = data;
			$scope.geojson_states.resetStyleOnMouseout=true;
			$scope.geojson_states.style = {
				fillColor: "green",
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0
			};
		});
	};

	$scope.getFrequencyByYear = function(nameVal) {
		//Look into doing name wars, male vs female, http://underscorejs.org/
		$http.get('./getFrequencyOfNameByState/John/2014').success(function(data) {
			console.log(data);
		});
	};


	$scope.$on("leafletDirectiveGeoJson.mouseover", function(ev, leafletPayload) {
		stateMouseover(leafletPayload.leafletObject.feature, leafletPayload.leafletEvent);
	});

	$scope.$on("leafletDirectiveGeoJson.click", function(ev, leafletPayload) {
		countryClick(leafletPayload.leafletObject.feature, leafletPayload.leafletEvent);
	});


	// Mouse over function, called from the Leaflet Map Events
	function stateMouseover(feature, leafletEvent) {
		var layer = leafletEvent.target;
		layer.setStyle({
			weight: 2,
			color: '#666',
			fillColor: 'white'
		});
		layer.bringToFront();
	}

	// Mouse over function, called from the Leaflet Map Events
	function countryClick(feature, leafletEvent) {
		Materialize.toast("Clicked " + feature.properties.NAME, 1500);
	}

}]);