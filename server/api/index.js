const layer		= require('./routes/layer');
const authenticate	= require('./routes/authenticate');
const register		= require('./routes/register');
const theGuardian	= require('./routes/middleware');
const User		= require('./models/user');

module.exports = function(app, apiRoutes, jwt) {

	// No token required
	signup(app);
	authenticate(app, jwt);
	// Middleware for apiRoutes/
	theGuardian(app, apiRoutes, jwt);
	// Layer API
	layer(apiRoutes);

};
