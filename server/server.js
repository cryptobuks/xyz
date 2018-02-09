"use strict";
//========== DEPENDENCIES ==============================
const User		= require('./api/models/user');
const bodyParser	= require('body-parser');
const config		= require('./config');
const cors		= require('cors');
const express		= require('express');
const jwt		= require('jsonwebtoken');
const mongoose		= require('mongoose');
const morgan		= require('morgan');

const app		= express();
const apiRoutes		= express.Router();
const port		= process.env.PORT || 3000;

//========== CONFIGURATION  =============================
mongoose.connect(config.database);

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({origin: '*'}));
app.use('/api', apiRoutes);

//========== ROUTES  ====================================
require('./api/routes')(app, apiRoutes, jwt);
//========== LAUNCH COMMAND  ============================
app.listen(port, () => {
	  console.log('App.Listen at http://localhost:' + port);
});
