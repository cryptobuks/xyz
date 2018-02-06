var path = "app/exe/exe";


module.exports = function(app, db) {
	app.post('/fade', (req, res) => {
		const coord = {lat: req.body.lat, lng: req.body.lng};
		const arg = " " + coord.lat + " " + coord.lng;
		const exec = require('child_process').exec;

		const process = (error, stdout, stderr) => {
				if (error !== null || `${stderr}`) {
					console.log(`[STD_ERROR] ${stderr}`);
					console.log(`exec error: ${error}`);
					res.send('Oh no, error...');
				}
				else
					res.send("Everything's fine !");
			};
		const script = exec(path + arg, process);
	console.log("Hello from routes!");
	});
};
