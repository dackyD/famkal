'use strict';

var _ = require('lodash');
var passport = require('passport');
var MobilePrototype = require('./mobile.service');
var ErrorHandler = require('../../components/errorhandler');

var MobileService = new MobilePrototype();
var ErrorService = new ErrorHandler();


var filterAccount = function (account) {
    if (account) {
        var tmp = account.get({plain: true});
        delete tmp.password;
        delete tmp.salt;
        return tmp;
    } else {
        return {};
    }
};


// Get list of mobiles
exports.index = function (req, res) {
    res.json([]);
};


exports.events = function (req, res) {
    console.log('mobile.controller.events');
    console.log(MobileService);
    MobileService.getEvents(function (err, events) {
        if (err) {
            ErrorService.internalServerErrorHandler(err, res)
        }
        if (events) {
            res.status(200).json(events);
        }
    });
};

exports.login = function (req, res, next) {
    console.log('security.login: %j', req.body);
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({message: 'Invalid user.'});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            console.log('Admin success login: %j', req.user);
            return res.status(200).json(filterAccount(req.user)); //TODO add filterUser
        });

    })(req, res, next);
};

exports.logout = function (req, res, next) {
    console.log('security.logout: %j', req.user);
    req.logOut();
    res.status(204).json({message: 'success logout'});
};

exports.isSecure = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json(filterAccount(req.user));
    }
};