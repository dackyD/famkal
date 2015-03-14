'use strict';

var _ = require('lodash');
var MobilePrototype = require('./mobile.service');
var ErrorHandler = require('../../components/errorhandler');

var MobileService = new MobilePrototype();
var ErrorService = new ErrorHandler();


// Get list of mobiles
exports.index = function (req, res) {
    res.json([]);
};


exports.events = function (req, res) {
    console.log('mobile.controller.events');
    console.log(MobileService);
    MobileService.getEvents(function (err, events) {
        if(err){
            ErrorService.internalServerErrorHandler(err, res)
        }
        if(events){
            res.status(200).json(events);
        }
    });
};