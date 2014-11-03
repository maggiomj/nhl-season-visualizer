var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();


app.use(express.static(path.resolve('../viz-app/')));
app.set('port', (process.env.PORT || 4000));

//routes 
app.all('*', routes.configureAllRoutes);
app.get('/', routes.getIndexRoute);  
app.get('/seasons/:id', routes.getSeasonRoute);

var server = app.listen(app.get('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('NHL-Viz app listening at http://%s:%s', host, port);

});