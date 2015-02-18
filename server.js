// server.js

    // set up ========================
    var express  = require('express'); 
    var app      = express();                               
    var port = process.env.PORT || 8080;
    var mongoose = require('mongoose');                     
    var morgan = require('morgan');             
    var bodyParser = require('body-parser'); 
    var cookieParser = require('cookie-parser');    
    var methodOverride = require('method-override'); 
    var passport = require('passport');
    var flash = require('connect-flash');
    var session = require('express-session');
    var database = require('./config/database');
    require('./config/passport')(passport);

    // configuration =================
    
    mongoose.connect(database.url);  

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(cookieParser());                                            // Read cookies (needed for auth)
    app.use(bodyParser());                                          // Get information from html forms
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    app.set('views', __dirname + '/public/views/');
    app.set('view engine', 'ejs'); // set up ejs for templating

    //required for passport
    app.use(session({ secret: 'A1234567890B'})); //session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    // routes ======================================================================
    require('./app/routes')(app, passport); // load routes and pass in our app and fully configured passport


    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port " + port);