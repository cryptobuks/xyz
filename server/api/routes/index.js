const layer		= require('./layer');
const authenticate	= require('./authenticate');
const signup		= require('./signup');
const theGuardian	= require('./middleware');
const User		= require('../models/user');

module.exports = function(app, apiRoutes, jwt) {

	authenticate(app, apiRoutes, jwt);
	signup(app, apiRoutes, jwt);

	theGuardian(app, apiRoutes, jwt);

	layer(app, apiRoutes);

	apiRoutes.get('/users', function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
	}); 
};
