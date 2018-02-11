const User		= require('../models/user');

module.exports = function(app, jwt) {

	app.post('/authenticate', function(req, res) {
		User.findOne({
			name: req.body.name
		}, function(err, user) {
			if (err) throw err;
			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed. User not found.',
				});
			} else if (user) {
				if (user.password != req.body.password) {
					res.json({
						success: false,
						message: 'Authentication failed. Wrong password.'
					});
				}
				else {
					const payload = {
						admin: user.admin 
					};
					var token = jwt.sign(payload, app.get('superSecret'));
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token,
					});
				} 

			}

		});
	});

	app.get('/authenticate', function(req, res) {
		res.json({
			success: false,
			message: "Work in progress..."
		});
	});
}
