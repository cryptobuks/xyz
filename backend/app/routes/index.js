const update = require('./api');

module.exports = function(app, db) {
	update(app, db);
};
