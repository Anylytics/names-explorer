var ngAppControllers = angular.module('ngAppControllers', []);


ngAppControllers.controller('homeController', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http) {
	//Example of a basic controller, includes ability to pull route parameters ($routeParams.name defined in app.js routing configuration)
	

	//$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.selected_name = "";
	$scope.labels=[1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];
	$scope.seriesBackup = ['James', 'James.1','David','Richard','Thomas'];
	$scope.options = {
		scaleShowGridLines : false,
		pointDot : false,
		bezierCurve : false
	};
	$scope.dataBackup = [
		[33776,35569,37340,42122,42390,47917,49748,49813,50464,52936,52688,53208,53663,52750,52116,53933,51199,51922,51099,54236,54986,54672,56546,59092,59627,62472,66719,77173,80248,76944,74450,87425,94755,88596,86856,86221,87175,87083,85946,86277,84130,84860,84242,78731,78597,76872,75896,72563,71332,73050,67707,65193,61704,60730,59940,61775,54608,47084,42896,41365,39595,38311,40051,39908,39371,39312,38301,38867,36336,35843,35840,34026,32628,32490,32695,32344,30501,28502,26249,24764,22727,21152,20399,19682,18550,17974,17066,16951,16888,16451,16120,16226,15941,15154,14175,13852,13227,13385,13502,14301],
		[33776,35569,37340,42122,42390,47917,49748,49813,50464,52936,52688,53208,53663,52750,52116,53933,51199,51922,51099,54236,54986,54672,56546,59092,59627,62472,66719,77173,80248,76944,74450,87425,94755,88596,86856,86221,87175,87083,85946,86277,84130,84860,84242,78731,78597,76872,75896,72563,71332,73050,67707,65193,61704,60730,59940,61775,54608,47084,42896,41365,39595,38311,40051,39908,39371,39312,38301,38867,36336,35843,35840,34026,32628,32490,32695,32344,30501,28502,26249,24764,22727,21152,20399,19682,18550,17974,17066,16951,16888,16451,16120,16226,15941,15154,14175,13852,13227,13385,13502,14301],
		[5395,5813,6100,6627,6719,7445,7766,7864,8236,8757,8919,9034,9430,9997,11293,12277,11776,12135,12020,13998,15660,17476,20976,22990,25359,27683,30551,35892,37237,37374,37093,46435,57797,56611,59610,60733,64741,71762,76037,79528,86191,81603,82367,82585,83921,85931,84771,81328,78482,75066,67886,66447,66805,63739,63728,61776,53136,46382,41110,41798,39172,39296,40548,40698,42069,41913,40643,40441,39192,38471,38502,37133,36776,35304,35203,33741,30414,28403,27017,24858,23029,22993,21869,20869,20318,19749,19330,18662,18602,18372,18097,17610,17515,16299,15420,14171,13194,12494,12308,12078],
		[9144,10133,10914,12325,12442,15011,16378,17540,18881,21247,23274,25147,26764,28790,29571,32173,31811,31790,31329,33152,33939,33481,32972,34379,35367,37414,39101,43581,46331,45632,46045,58859,58499,50959,50942,51009,54485,58349,58285,57007,53523,52879,52400,49958,47176,43562,41119,39424,40780,40106,36858,34468,33592,33000,31102,30467,26166,22322,19953,18656,17681,16766,17450,16730,16723,16658,16856,16706,15890,15591,15327,15006,14392,14136,14133,13575,12550,11326,10227,9513,8782,8179,7241,6952,6499,6351,5767,5317,5052,4843,4662,4466,4416,4052,3604,3228,3157,3011,2784,2857],
		[11490,11997,12612,13911,13436,14937,15309,15267,15884,16554,16688,16602,17016,16577,16267,17016,16837,16827,16498,17369,17674,18340,19772,21373,22124,23985,26641,31102,32865,31595,31877,38864,44838,43798,45201,45620,48237,48617,46967,47131,45807,44800,44580,42062,40286,39299,37544,36536,35509,34464,31635,29017,28285,27456,27491,26689,23165,19571,17941,17286,16558,16119,16602,16490,16475,17566,17162,17576,17559,17588,17590,17343,18120,18791,18431,18214,16780,15283,14859,14903,14159,13797,12894,12883,12790,12638,12147,11291,10930,10495,10033,9504,8921,8349,7715,7114,6896,6823,6756,6972]
	];
	$scope.data = [];
	$scope.series = [];


	$scope.onClick = function (points, evt) {
		console.log(points, evt);

		//Materialize.toast("Clicked " + JSON.stringify(points), 1000);
	};

	$('#autocomplete_histName').autocomplete({
		serviceUrl: 'https://dev13895.service-now.com/names_suggest.do',
		deferRequestBy: 300,
		onSearchStart: function(query){$scope.loading=true},
		onSearchComplete: function(query){$scope.loading=false},
		onSelect: function (suggestion) {
			$scope.getSimilarNames(suggestion.value);
		}
	});

	$scope.getSimilarNames = function(inputVal) {
		//$scope.data = $scope.dataBackup;
		$http.get('https://dev13895.service-now.com/similar_names.do?input_name='+inputVal)
			.success(function(data){
				//console.log(data.results);
				$scope.selected_name = inputVal;
				$scope.buildData(data.results);
			});
	};

	$scope.buildData = function(names) {
		console.log(names);
		$http.get('https://dev13895.service-now.com/name_frame.do?names='+names)
			.success(function(data){
				console.log(data);
				for (var i=0; i<data.length; i++) {
					console.log('running...');
					$scope.series.push(data[i].name);
					$scope.data.push(JSON.parse(data[i].data));
				}
				$scope.$apply;
			});
	}

	//$scope.data = $routeParams.name + " from URL parameter";
}]);

ngAppControllers.controller('histController', ['$scope','$http', function($scope, $http) {
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