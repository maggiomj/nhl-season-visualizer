var http = require('http');

// configure all
var configureAll = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
 };

 var getIndex = function(req, res) {
	res.sendFile('index.html');
 };
 
 // get season with id
var getSeason = function(req, res) {
	var response = res;
	console.log('request got');
	var url = 'http://www.nicetimeonice.com/api/seasons/' + req.params.id + '/games';
	http.get(url, function(res, error) {
		console.log('api response');
		var toReturn = '';
		res.on('data', function(data) {
			toReturn += data;
		});
		
		res.on('end', function(){
			console.log(toReturn.length);
			response.send(toReturn);
		});
	});
};

// exports
var exports = module.exports = {};

exports.configureAllRoutes = configureAll;
exports.getIndexRoute = getIndex;
exports.getSeasonRoute = getSeason;
