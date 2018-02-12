const User		= require('../models/user');

module.exports = function(app) {

	app.post('/register', function(req, res) {
		if (!req.body.name || !req.body.password) {
			return (res.json({
				success: false,
				message: 'Please enter name and password.',
			}));
		}
		else {
			var newUser = new User({
				name: req.body.name,
				password: req.body.password,
			});
		}
		newUser.save(function(err) {
			if (err) {
				return (res.json({
						success: false,
						message: 'That name already exists.',
				}));
			}
			res.json({
				success: true,
				message: 'Successfully created new user.',
			});
		});
	});

}

