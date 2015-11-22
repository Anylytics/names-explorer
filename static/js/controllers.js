var ngAppControllers = angular.module('ngAppControllers', []);


ngAppControllers.controller('homeController', ['$scope','$http', function($scope, $http) {
	$scope.year_min = 1990;
	$scope.year_max = 2014;
	$scope.selectedName = "";
	$scope.loadingHist = false;
	$scope.loadingSettings = false;
	$scope.genderVal = false;
	$scope.histByYear_labels = [];
	$scope.histByYear_data = [];
	$scope.labels = [];
	$scope.series = ['Male', 'Female'];
	$scope.settingsSizing = "s12 m3";
	$scope.chartSizing = "s12 m9";
	$scope.currentLoadedName = [
	];
	$scope.sizing = {
		settings: "s12 m3",
		chart: "s12 m9",
		settingsContentTitle: "s12",
		settingsContent: "s12",
		expanded: false
	}

	$scope.data = [];

	$scope.toggleSizing = function() {
		if (!($scope.sizing.expanded)) {
			$scope.sizing.settings = "s12 m12";
			$scope.sizing.chart = "s12 m12";
			$scope.sizing.settingsContent = "s6";
		} else {
			$scope.sizing.settings = "s12 m3";
			$scope.sizing.chart = "s12 m9";
			$scope.sizing.settingsContent = "s12";
		}
		//$scope.generateChart();
		$scope.sizing.expanded = !($scope.sizing.expanded);
	};

	$('#autocomplete_histName').autocomplete({
		serviceUrl: '/names_suggest',
		deferRequestBy: 300,
		onSearchStart: function(query){$scope.loadingSettings=true},
		onSearchComplete: function(query){$scope.loadingSettings=false},
		onSelect: function (suggestion) {
			$scope.selectedName = suggestion.value;
			$scope.generateChart();
		}
	});

	$scope.getNames = function(yearVal) {

		$http.get('./getNamesByYear/'+yearVal).success(function(data) {
			$scope.names = data.names;
		});

	};

	$scope.generateChart = function() {
		if ($scope.selectedName!='') {
			var tmpObj = {};
			tmpObj.name = $scope.selectedName;
			tmpObj.gender = 'M';
			if ($scope.genderVal) {
				tmpObj.gender = 'F';
			}
			var currentIndex = $scope.currentLoadedName.length;
			$scope.currentLoadedName.push(tmpObj);
		}
		$scope.getFrequencyByYear($scope.currentLoadedName[currentIndex]);
		//$scope.selectedName = "";
		Materialize.toast("Fetching data...",1000);
	}

	$scope.getFrequencyByYear = function(nameVal) {
		//Look into doing name wars, male vs female, http://underscorejs.org/
		$scope.loadingHist = true;
		$http.get('./getFrequencyOfName/'+nameVal.name+'/'+$scope.year_min+'/'+$scope.year_max+'/'+nameVal.gender).success(function(data) {
			$scope.loadingHist = false;
			$scope.currentLoadedName[$scope.currentLoadedName.length-1].data = data;
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
			$scope.generateChart();
		}
	});


}]);


ngAppControllers.controller('urlParamsController', ['$scope', '$routeParams', function($scope, $routeParams) {
	//Example of a basic controller, includes ability to pull route parameters ($routeParams.name defined in app.js routing configuration)
	$scope.data = $routeParams.name + " from URL parameter";
}]);

ngAppControllers.controller('indexController', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.data = "Hello world"
	$scope.about = function() {
		Materialize.toast('Made by Anylytics' ,2000);
		$timeout(function() {
			Materialize.toast('Name data provided by US Census' ,2000);
			$timeout(function() {
				Materialize.toast('Libraries used can be found on the <a href="./#/attribution"> attributions </a> page' ,4000);
			}, 1000);
		}, 1000);
	};
}]);

ngAppControllers.controller('mapController', ['$scope', '$http','leafletData', function($scope, $http, leafletData) {

	$http.get('https://a.tiles.mapbox.com/v4/feelcreative.llm8dpdk/features.json?access_token=pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ').success( function(data) {
		$scope.geojsonData = data;
	});
	$scope.geojson_states = {};
	$scope.currentName = "John";
	$scope.center = {
		lat:39.0997,
		lng:-94.5783,
		zoom:5
	}
	$scope.loading=false;
	$scope.namesDistribution = [];

	$scope.loadGeo = function() {
		$scope.loading=true;
		//$http.get('./static/js/geo/us_states.json').success(function(data) {
			$scope.geojson_states.data = $scope.geojsonData;
			$scope.geojson_states.resetStyleOnMouseout=true;
			$scope.geojson_states.style = style;
			$scope.loading=false;	

        leafletData.getMap().then(function(map) {
            console.log(map);
        });
		//});
	};

	$scope.getFrequencyByYear = function(nameVal) {
		$scope.loading=true;	
		//Look into doing name wars, male vs female, http://underscorejs.org/
		$http.get('./getFrequencyOfNameByState/'+$scope.currentName+'/M/2010').success(function(data) {
			//console.log(data);
			$scope.loading=false;	
			$scope.buildDistribution(data.names);
			$scope.geojson_states.data = $scope.geojsonData;
			$scope.geojson_states.style = style();
			$scope.$apply();
		});
	};

	$scope.buildDistribution = function(data) {
		//console.log(Math.max(data.frequency));
		var tmpFreqArray = [];
		var tmpPopArray = [];
		var normFreqArray = [];
		for (i=0; i<data.length; i++) {
			tmpFreqArray.push(data[i].frequency);
			tmpPopArray.push(data[i].pop);
			var numBirths = data[i].pop*data[i].rate/1000;
			normFreqArray.push(data[i].frequency/numBirths);

		}
		//var freqMax = Math.max.apply(null, tmpFreqArray);
		//var freqMin = Math.min.apply(null, tmpFreqArray);
		//var freqSpr = freqMax-freqMin;
		//var popMax = Math.max.apply(null, tmpPopArray);
		//var popMin = Math.min.apply(null, tmpPopArray);
		//var popSpr = popMax-popMin;
		var normMax = Math.max.apply(null, normFreqArray);
		var normMin = Math.min.apply(null, normFreqArray);
		var normSpr = normMax-normMin;
		//console.log(normSpr+"//"+normMax+"//"+normMin);

		for (i=0; i<data.length; i++) {
			//data[i].frequencyPercentile = (data[i].frequency-freqMin)/freqSpr;
			//data[i].popPercentile		= (data[i].pop-popMin)/popSpr;
			//data[i].freqPercentileStateNorm = data[i].frequencyPercentile/data[i].popPercentile;
			//console.log(data[i].state + ": " + data[i].frequencyPercentile);
			var numBirths = data[i].pop*data[i].rate/1000;
			data[i].frequencyPercentile = ((data[i].frequency/(numBirths))-normMin)/normSpr;
			console.log(data[i]);
		}
		//console.log(data);

		$scope.namesDistribution = data;

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
		layer.setStyle(style);
		layer.bringToFront();
	}

	// Mouse over function, called from the Leaflet Map Events
	function countryClick(feature, leafletEvent) {
		Materialize.toast("Clicked " + feature.properties.NAME + "/" + feature.properties.POP_INDEX, 1500);
	}

	function style(feature) {
		//console.log(feature.properties.STATE);
		return {
			fillColor: getColor(feature.properties.STATE, feature.properties.POP_INDEX),
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7
		};
	}

	function getColor(state, popindex) {
		//var gradient = ["#196D20", "#307C36", "#488B4C", "#609B62", "#77AA78", "#8FBA8F", "#A7C9A5", "#BED9BB", "#D6E8D1","#EEF8E8"];
		var gradient1 = ["#EEF8E8", "#D6E8D1", "#BED9BB", "#A7C9A5", "#8FBA8F", "#77AA78", "#609B62", "#488B4C", "#307C36", "#196D20"];
		var gradient = ["#FFFFFF", "#F6F8F6", "#EDF1ED", "#E4EAE4", "#DBE4DC", "#D3DDD3", "#CAD6CA", "#C1D0C2", "#B8C9B9", "#AFC2B0", "#A7BCA8", "#9EB59F", "#95AE96", "#8CA88E", "#83A185", "#7B9A7C", "#729474", "#698D6B", "#608662", "#58805A"]
		for (i=0; i<$scope.namesDistribution.length; i++) {
			if ($scope.namesDistribution[i].state==state) {
				//console.log($scope.namesDistribution[i]);
				console.log(Math.floor($scope.namesDistribution[i].frequencyPercentile*20)-1);
				return gradient[Math.floor($scope.namesDistribution[i].frequencyPercentile*20)-1]
			}
		}
	}

}]);