var express   = require('express');
var env = process.env.NODE_ENV || 'development';
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/assets',      express.static(__dirname + '/dist/assets'));
app.use('/favicon.ico', express.static(__dirname + '/dist/favicon.ico'));

app.all('*', function(request, response) {
  response.setHeader('Last-Modified', (new Date()).toUTCString());
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Your express web server is running on port', app.get('port'));
});
