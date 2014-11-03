var services = angular.module('NHLDataVizApp.services', []);

services.factory('DataLayer', ['$http',

    function($http) {

        var factory = {};
        var seasons = {}; // todo cache

        factory.getSeason = function(seasonID, success) {
            if(seasonID in seasons){
                success(seasons[seasonID]);
                return;
            }
			
			$http.get('/seasons/'+seasonID).success(function(data) {
                seasons[seasonID] = data;
                success(data);
            });
			
            /*$http.get('data/games-2013-2014.json').success(function(data) {
                seasons = data;
                success(seasons);
            });*/
        };

        return factory;
    }
]);

services.factory('TeamInfoStore', function() {
	return {
		"Anaheim Ducks": {"name": "Anaheim Ducks", "imageUrl" : "assets/images/ana.png", "conference" : "W", "color" : "#7DFE7C"},
		"Boston Bruins": {"name": "Boston Bruins", "imageUrl" : "assets/images/bos.png", "conference" : "E", "color" : "#9B575A"},
		"Buffalo Sabres": {"name": "Buffalo Sabres", "imageUrl" : "assets/images/buf.png", "conference" : "E", "color" : "#E34F50"},
		"Calgary Flames": {"name": "Calgary Flames", "imageUrl" : "assets/images/cal.png", "conference" : "W", "color" : "#648A1A"},
		"Carolina Hurricanes": {"name": "Carolina Hurricanes", "imageUrl" : "assets/images/car.png", "conference" : "E", "color" : "#C6829A"},
		"Chicago Blackhawks": {"name": "Chicago Blackhawks", "imageUrl" : "assets/images/chi.png", "conference" : "W", "color" : "#FC0314"},
		"Colorado Avalanche": {"name": "Colorado Avalanche", "imageUrl" : "assets/images/col.png", "conference" : "W", "color" : "#EE4D74"},
		"Columbus Bluejackets": {"name": "Columbus Bluejackets", "imageUrl" : "assets/images/cbj.png", "conference" : "W", "color" : "#5018DB"},
		"Dallas Stars": {"name": "Dallas Stars", "imageUrl" : "assets/images/dal.png", "conference" : "W", "color" : "#006108"},
		"Detroit Red Wings": {"name": "Detroit Red Wings", "imageUrl" : "assets/images/det.png", "conference" : "E", "color" : "#EB5133"},
		"Edmonton Oilers": {"name": "Edmonton Oilers", "imageUrl" : "assets/images/edm.png", "conference" : "W", "color" : "#643685"},
		"Florida Panthers": {"name": "Florida Panthers", "imageUrl" : "assets/images/fla.png", "conference" : "E", "color" : "#5DFC94"},
		"Los Angeles Kings": {"name": "Los Angeles Kings", "imageUrl" : "assets/images/lak.png", "conference" : "W", "color" : "#027424"},
		"Montreal Canadiens": {"name": "Montreal Canadiens", "imageUrl" : "assets/images/mtl.png", "conference" : "E", "color" : "#A46E2E"},
		"Minnesota Wild": {"name": "Minnesota Wild", "imageUrl" : "assets/images/min.png", "conference" : "W", "color" : "#D0E120"},
		"Nashville Predators": {"name": "Nashville Predators", "imageUrl" : "assets/images/nas.png", "conference" : "W", "color" : "#5C6483"},
		"New Jersey Devils": {"name": "New Jersey Devils", "imageUrl" : "assets/images/njd.png", "conference" : "E", "color" : "#B35099"},
		"New York Islanders": {"name": "New York Islanders", "imageUrl" : "assets/images/nyi.png", "conference" : "E", "color" : "#6ED9A8"},
		"New York Rangers": {"name": "New York Rangers", "imageUrl" : "assets/images/nyr.png", "conference" : "E", "color" : "#1CBC0C"},
		"Ottawa Senators": {"name": "Ottawa Senators", "imageUrl" : "assets/images/ott.png", "conference" : "E", "color" : "#74FCD3"},
		"Philadelphia Flyers": {"name": "Philadelphia Flyers", "imageUrl" : "assets/images/phi.png", "conference" : "E", "color" : "#8F0741"},
		"Phoenix Coyotes": {"name": "Phoenix Coyotes", "imageUrl" : "assets/images/pho.png", "conference" : "W", "color" : "#ABF094"},
		"Pittsburgh Penguins": {"name": "Pittsburgh Penguins", "imageUrl" : "assets/images/pit.png", "conference" : "E", "color" : "#8716AC"},
		"San Jose Sharks": {"name": "San Jose Sharks", "imageUrl" : "assets/images/sjs.png", "conference" : "W", "color" : "#062928"},
		"St. Louis Blues": {"name": "St. Louis Blues", "imageUrl" : "assets/images/stl.png", "conference" : "W", "color" : "#000000"},
		"Tampa Bay Lightning": {"name": "Tampa Bay Lightning", "imageUrl" : "assets/images/tbl.png", "conference" : "E", "color" : "#C956DA"},
		"Toronto Maple Leafs": {"name": "Toronto Maple Leafs", "imageUrl" : "assets/images/tor.png", "conference" : "E", "color" : "#9E0C18"},
		"Vancouver Canucks": {"name": "Vancouver Canucks", "imageUrl" : "assets/images/van.png", "conference" : "W", "color" : "#8CFE7B"},
		"Washington Capitals": {"name": "Washington Capitals", "imageUrl" : "assets/images/was.png", "conference" : "E", "color" : "#406FA5"},
		"Winnipeg Jets": {"name": "Winnipeg Jets", "imageUrl" : "assets/images/win.png", "conference" : "W", "color" : "#5A9305"}
	}
});