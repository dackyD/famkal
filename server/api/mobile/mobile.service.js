/**
 * Created by hdd on 14/03/15.
 */


var db = require('../../models');

var MobileService = function(){

};


MobileService.prototype.getEvents = function(callback) {
    console.log('getEvents');

    var Member = db.models.Member;
    var Event = db.models.Event;
    Event.findAll({where: {calendar_id: 1}}).then(function(events){
        callback(null, events);
    }).catch(function(err){
       callback(err, null);
    });
};



module.exports = MobileService;