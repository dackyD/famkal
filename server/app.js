/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
var db = require('./models');


//Sync db
db.sequelize.sync().then(function () {
    console.log('========syncing db complete========');
    // Start server
    server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
        console.log('===================================');
    });
});

// Expose app
//exports = module.exports = app;
module.exports = app;