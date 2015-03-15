/**
 * Created by hdd on 15/03/15.
 */


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require("../../models");
var Account = db.models.Account;

module.exports = function () {

    passport.use(new LocalStrategy(function (username, password, done) {
        Account.find({
            where: {email: username}
        })
            .success(function (account) {
                if (!account) {
                    done(null, false, {message: 'Unknown account'});
                } else if (account.authenticate(password)) {
                    done(null, false, {message: 'Invalid password'})
                } else {
                    done(null, account);
                }
            })
            .error(function (err) {
                done(err);
            })
    }));
};