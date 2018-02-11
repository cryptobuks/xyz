const exec 	= require('child_process').exec;
const path	= require('../../config/path');

module.exports = function(apiRoutes) {

	apiRoutes.post('/put_pixel', (req, res) => {
		if (!req.body.lat || !req.body.lng)
			return (catch_err(res, "Invalid Coordinate...", 1));
		var coord = {lat: req.body.lat, lng: req.body.lng};
		var arg = " " + path.path_img + " " + coord.lat + " " + coord.lng;
		routine(path.path_process, arg, res);
	});

	apiRoutes.post('/delete', (req, res) => {
		if (req.body.key != path.key)
			return (catch_err(res, "Invalid Password...", 1));
		var arg = " " + path.path_img;
		routine(path.path_blackout, arg, res);
	});

	apiRoutes.get('/wanderers', function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
	}); 

};

const routine = (path, arg, res) =>
{
	this.process = (error, stdout, stderr) => 
	{
		if (error !== null || `${stderr}`)
			catch_err(res, `${stderr}` || "Unknow error.", 1);
		else
			catch_err(res, "Program Complete !", 0);
	};
	exec(path + arg, this.process);
}

const catch_err = (res, str, err) =>
{
	if (err)
		return (res.json({
			success: false,
			message: str,
		}));
	else
		return (res.json({
			success: true,
			message: str,
		}));
}
