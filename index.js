var express = require('express');
var app = express();

var valetService = require('./controller/valetservicecontroller.js');
valetService(app);

app.listen(7777, function() {
	console.log('server started.');
})