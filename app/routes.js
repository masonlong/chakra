var Todo = require('./models/todo');
var Journal = require('./models/journalModel.js')

function getTodos(res){
    Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
};

function getJournals(res){
    Journal.find(function(err, journal) {
        if (err)
            res.send(err)
        res.json(journal);
    });
};

module.exports = function(app, passport) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    //API Journal
    app.get('/api/journal', function(req, res) {
        getJournals(res);
    });
    app.post('/api/journal', function(req, res) {
        Journal.create({
            text: req.body.text,
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);
                getJournals(res);
        });
    });

    app.delete('/api/journal/:journal_id', function(req, res) {
        Journal.remove({
            _id : req.params.journal_id
        }, function(err, journal) {
            if (err)
                res.send(err);

            getJournals(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendfile('./public/views/index.html'); 
    });
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/profile', function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        }); 
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    };

    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    app.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
           res.redirect('/profile');
        });
    });


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// locally --------------------------------
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // Other components
    app.get('/todo', function(req, res) {
        res.sendfile('./public/views/todo.html', { message: req.flash('signupMessage') });
    });
    app.get('/journal', function(req, res) {
        res.sendfile('./public/views/journal.html', { message: req.flash('signupMessage') });
    });
};

