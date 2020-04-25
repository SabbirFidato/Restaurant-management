// DECLARATION
var express = require('express');
var app = express();
var port = 1332;

var bodyParser = require('body-parser');
var expressSession = require('express-session');

var login = require('./controllers/login');
var logout = require('./controllers/logout');
var admin = require('./controllers/admin');
var employee = require('./controllers/employee');



// CONFIGURE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'my top secret pass', resave: false, saveUninitialized: true}));

app.use('*', function(req, res, next){
	
	// i was using the wrong property
	// is will be req.originalUrl, not req.path

	if(req.originalUrl == '/metro' || req.originalUrl == '/logout')
	{
		next();
	}
	else
	{
		if(!req.session.username)
		{
			res.redirect('/metro');
			return;
		}
		next();
	}
});



// ROUTES
app.use('/metro', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/employee', employee);



// SERVER START
app.listen(port, function(){
	console.log('Server started at port 1332...');
});