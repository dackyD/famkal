'use strict';

var express = require('express');
var controller = require('./mobile.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/events', controller.events);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

module.exports = router;