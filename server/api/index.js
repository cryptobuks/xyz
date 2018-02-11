const layer		= require('./routes/layer');
const authenticate	= require('./routes/authenticate');
const signup		= require('./routes/signup');
const theGuardian	= require('./routes/middleware');
const User		= require('./models/user');

module.exports = function(app, apiRoutes, jwt) {

	// No token required
	authenticate(app, jwt);
	signup(app, jwt);
	// Middleware for apiRoutes/
	theGuardian(app, apiRoutes, jwt);
	// Layer API
	layer(apiRoutes);

};
