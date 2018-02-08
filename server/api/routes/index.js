const layer = require('./layer');

module.exports = function(app) {
	layer(app);

 app.get('/', function(req, res) {
     res.send('Hello! The API is at http://localhost:' + port + '/api');
     });
};
