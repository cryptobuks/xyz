const User		= require('../models/user');

module.exports = function(app, jwt) {

	app.post('/signup', function(req, res) {
		res.json({
			success: false,
			message: "Work in progress..."
		});
	});

	app.get('/signup', function(req, res) {
		res.json({
			success: false,
			message: "Work in progress..."
		});
	});
}
