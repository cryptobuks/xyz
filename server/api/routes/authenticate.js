const User		= require('../models/user');
const config		= require('../../config/config');

module.exports = function(app, jwt) {

	app.post('/authenticate', function(req, res) {
		User.findOne({ name: req.body.name }, function(err, user) {
			if (err || !user)
			{
				return (res.send({
					success: false,
					message: 'Authentication failed. User not found.',
				}));
			}
			else
			{
				user.comparePassword(req.body.password, function(err, isMatch) {
					if (isMatch && !err) {
						var token = jwt.sign(user.name, app.get('superSecret'));
						res.json({
							success: true,
							message: 'Enjoy your token.',
							token: token,
						});
					}
					else {
						res.json({
							success: false,
							message: 'Incorrect Password.',
						});
					}
				});
			}
		});
	});
}
