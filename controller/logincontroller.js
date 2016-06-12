
var passport = require('passport');
var googlePlusStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function(router, config) {
	console.log(config.googleclientId);
	console.log(config.googleclientsecret);
	passport.serializeUser(function(user, done) {
	        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	passport.use(new googlePlusStrategy({
		clientID : config.googleclientId,
		clientSecret : config.googleclientsecret,
		callbackURL : config.googlecallbackURL
	}, function(tokens, refreshToken, profile, done) {
		done(null, profile, tokens);
	}));

	router.use(passport.initialize());

	router.get('/login', function(req, res) {
		res.render('login');
	});

	router.post('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));

	router.get('/auth/google/callback' 
		, passport.authenticate('google', {
				successRedirect: '/success', 
				failureRedirect: '/login'})
		);

	router.get('/success', function(req, res) {
		res.send('success');
	});
}