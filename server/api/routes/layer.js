const exec 		= require('child_process').exec;
const config		= require('../config/path');

module.exports = function(app) {
	app.post('/layer', (req, res) => {
		console.log(req.body);
		if (!req.body.lat || !req.body.lng)
			return (catch_err(res, "Invalid Coordinate...", 1));
		var coord = {lat: req.body.lat, lng: req.body.lng};
		var arg = " " + config.path_img + " " + coord.lat + " " + coord.lng;
		routine(config.path_process, arg, res);
	});

	app.delete('/layer', (req, res) => {
		console.log(req.body);
		if (req.body.key != key)
			return (catch_err(res, "Invalid Password...", 1));
		var arg = " " + config.path_img;
		routine(config.path_blackout, arg, res);
	});

	app.get('/layer', (req, res) => {
		res.send('In Layer, Everything is connected !');
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
