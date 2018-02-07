var path_process = "app/exe/bin/process";
var path_blackout = "app/exe/bin/blackout";
var path_img = "app/img/layer.png";

module.exports = function(app) {
	app.post('/layer', (req, res) => {
		var exec = require('child_process').exec;
		var coord = {lat: req.body.lat, lng: req.body.lng};
		var arg = " " + path_img + " " + coord.lat + " " + coord.lng;
		var process = (error, stdout, stderr) => {
				if (error !== null || `${stderr}`) {
					console.log(`[STD_ERROR] ${stderr}`);
					console.log(`exec error: ${error}`);
					res.json({
						success: false,
						message: 'Oh no, error...',
					});
				}
				else
				{
					console.log(coord);
					res.json({
						success: true,
						message: 'Process Complete !',
					});
				}
			};
		const script = exec(path_process + arg, process);
	});

	app.delete('/layer', (req, res) => {
		const exec = require('child_process').exec;
		const process = (error, stdout, stderr) => {
				if (error !== null || `${stderr}`) {
					console.log(`[STD_ERROR] ${stderr}`);
					console.log(`exec error: ${error}`);
					res.json({
						success: false,
						message: 'Oh no, error...',
					});
				}
				else
				{
					res.json({
						success: true,
						message: 'Blackout Complete !',
					});
				}
			};
		const script = exec(path_blackout + " " + path_img, process);
	});

	app.get('/layer', (req, res) => {
		res.send('Everything is fine !');
	});
};
