const User		= require('../models/user');

module.exports = function(app, apiRoutes, jwt) {

	apiRoutes.post('/signup', function(req, res) {
		res.json({
			success: true,
			message: "todo"
		});
	});
}
