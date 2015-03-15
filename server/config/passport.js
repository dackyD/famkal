/**
 * Created by hdd on 15/03/15.
 */


var passport = require('passport');

module.exports = function () {

    passport.serializeUser(function (user, done) {
        //done(null, user.id);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('deserializeUser');
        done(null, user);
        //TODO: Bruk datastore feks redis.
        //Admin.find({where: {id: id}})
        //    .success(function (user) {
        //        done(null, user);
        //    })
        //    .error(function (err) {
        //        done(err, null);
        //    });
    });

    require('./strategies/local.js')();
};