var express = require('express');
var app = express();

var cookieParser = require('cookie-parser')
, bodyParser  = require('body-parser')
, session     = require('express-session');

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(bodyParser());
app.use(cookieParser('shhhh, very secret'));
app.use(session());

// Session-persisted message middleware 
app.use(function(req, res, next){ 
	var err = req.session.error 
	, msg = req.session.success;
	delete req.session.error; 
	delete req.session.success; 
	res.locals.message = '';
	if (err) res.locals.message = '<p class="msg error">' + err + '</p>'; 
	if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>'; 
	next(); 
}); 

var valetService = require('./controller/valetservicecontroller.js');
valetService(app);
var config = require('./config.js');
var loginController = require('./controller/logincontroller.js');
loginController(app, config);

app.listen(7777, function() {
	console.log('server started.');
})