var controllers = angular.module('NHLDataVizApp.controllers', []);

controllers.controller('SeasonGraphControl', function ($scope, $http) {
	$scope.loading = false;
	$scope.seasonID = '20132014';
	$scope.years = [{
			"label": "2008-2009",
			"value": "20082009"
		}, {
			"label": "2009-2010",
			"value": "20092010"
		}, {
			"label": "2010-2011",
			"value": "20102011"
		}, {
			"label": "2011-2012",
			"value": "20112012"
		}, {
			"label": "2012-2013",
			"value": "20122013"
		}, {
			"label": "2013-2014",
			"value": "20132014"
		}, {
			"label": "2014-2015",
			"value": "20142015"
		}
	];
});
