"use strict";
const express = 	require('express');
const bodyParser = 	require('body-parser');
const cors =		require('cors');
const port =		3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

require('./app/routes')(app);

app.listen(port, () => {
	  console.log('Listen on localhost:' + port);
});
