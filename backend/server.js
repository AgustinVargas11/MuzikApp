'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var session = require('express-session');
var config = require('./config');

var app = express();

app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: config.secret}));

var authenticate = function (req, res, next) {
    if (!req.isAuthenticated()) return res.send(401);
    next();
};

require('./config/passport')(app);
app.use('/api', authenticate);

// routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoute'));
app.use('/api/user', require('./routes/userRoute'));

var port = process.env.PORT || 7000;
mongoose.connect(config.database, function () {
    console.log('connected to mongoDB')
});

app.listen(port, function () {
    console.log('backend listening on port', port);
});
