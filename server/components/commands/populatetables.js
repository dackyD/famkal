var db = require('../../models');
var tableData = require('./data/tabledata');
var Q = require('q');
var async = require('async');
var moment = require('moment');


var accounts = [];
var createAccounts = function (callback) {
    console.log('createAccounts');
    var Account = db.models.Account;
    var promise = Q();
    tableData.accounts.forEach(function (accountData) {
        promise = promise.then(function () {
            console.log('inserting: %j', accountData);
            return Account.build(accountData)
                .hashPassword()
                .save()
                .then(function (a) {
                    console.log('success saving:', a.get({plain: true}));
                    accounts.push(a);
                })
                .catch(function (err) {
                    console.log('Error creating instance:', err);
                });
        });
    });
    return promise.then(function () {
        console.log('Success creating accounts');
        callback(null);
    }, function (err) {
        console.log('EXITING PROCESS WITH ERROR', err);
        process.exit(1);
    });
};

var createCalendars = function (callback) {
    console.log('createCalendars');
    var Calendar = db.models.Calendar;
    var promise = Q();
    var calendars = [];
    tableData.calendars.forEach(function (calendarData) {
        promise = promise.then(function () {
            return Calendar.build(calendarData)
                .save()
                .then(function (c) {
                    console.log('success saving:', c.get({plain: true}));
                    calendars.push(c);
                })
                .catch(function (err) {
                    console.log('ERROR creating calendar:', err);
                });
        });
    });

    promise.then(function () {
        console.log('====== ADDING calendar_account');
        console.log('====== calendars: %d accounts: %d', calendars.length, accounts.length);
        promise = Q();
        calendars.forEach(function (calendar) {
            promise = promise.then(function () {
                return calendar.addAccount(accounts[calendar.id - 1]).then(function (ca) {
                    console.log('success saving', ca.get({plain: true}));
                });
            });
        });
        promise.then(function () {
            console.log('success adding all calendars');
            callback(null, calendars);
        }, function (err) {
            console.log('ERROR:', err);
            process.exit(1);
        })
    });

};

var createEvents = function (calendars, callback) {
    var Event = db.models.Event;
    var promise = Q();
    var events = [];
    calendars.forEach(function (calendar) {
        tableData.events.forEach(function (event) {
            promise = promise.then(function () {
                // 1 - past, 2 - future
                var flag = Math.floor((Math.random() * 2) + 1);
                var days = Math.floor((Math.random() * 10) + 1);
                event.calendar_id = calendar.id;
                if (flag === 1) {
                    event.dt_start = moment(event.dt_start).subtract(days, 'days');
                    event.dt_end = moment(event.dt_start).add(4, 'hours');
                } else {
                    event.dt_start = moment(event.dt_start).add(days, 'days');
                    event.dt_end = moment(event.dt_start).add(4, 'hours');
                }
                return Event.build(event).save().then(function (e) {
                    console.log('success saving event:', e.get({plain: true}));
                    events.push(e);
                });
            });
        });
    });

    promise.then(function (res) {
        console.log('success adding all events');
        callback(null, events);

    }, function (err) {
        console.log('ERROR in createEvents:', err);
        process.exit(1);
    });
};

var createMembers = function (events, callback) {
    var Member = db.models.Member;
    var promise = Q();
    var members = [];
    accounts.forEach(function (account) {
        tableData.members.forEach(function (member) {
            promise = promise.then(function () {
                member.name = member.name + Math.floor((Math.random() * 100) + 1).toString();
                member.account_id = account.id;
                return Member.build(member).save().then(function (m) {
                    console.log('success saving member:', m.get({plain: true}));
                    members.push(m);
                });
            });
        });
    });
    promise.then(function () {
        console.log('success adding all members');
        callback(null, events, members);

    }, function (err) {
        console.log('ERROR in createMembers:', err);
        process.exit(1);
    });
};

var addMembersToEvent = function (events, members, callback) {
    var promise = Q();

    events.forEach(function (event) {
        promise = promise.then(function () {
            return event.addMember(members[event.id - 1]).then(function (eventMember) {
                console.log('success adding eventMember:', eventMember.get({plain: true}));
            });
        });
    });
    promise.then(function () {
        console.log('success adding event to members');
        callback(null, events);

    }, function (err) {
        console.log('ERROR in createMembers:', err);
        process.exit(1);
    });
};


var createReminders = function (events, callback) {

    var Reminder = db.models.Reminder;
    var promise = Q();
    tableData.reminders.forEach(function (reminder, index) {
        promise = promise.then(function () {
            var event = events[index];
            reminder.event_id = event.id;
            return Reminder.build(reminder).save().then(function (newReminder) {
                console.log('success saving reminder:', newReminder.get({plain: true}));
            });

        });
    });
    promise.then(function () {
        console.log('success adding reminders');
        callback(null, events);

    }, function (err) {
        console.log('ERROR in createReminders:', err);
        process.exit(1);
    });


};

var createReplications = function (events, callback) {

    var Replication = db.models.Replication;
    var promise = Q();

    tableData.replications.forEach(function (replication, index) {
        promise = promise.then(function () {
            replication.event_id = events[index].id;
            replication.limit = moment(replication.limit).add(tableData.limitValues[index].limit, tableData.limitValues[index].unit);
            return Replication.build(replication).save().then(function (newReplication) {
                console.log('success saving replication', newReplication.get({plain: true}));
            });
        });
    });
    promise.then(function () {
        console.log('success adding replications');
        callback(null, 'SUCCESS POPULATING DB');

    }, function (err) {
        console.log('ERROR in createReplications:', err);
        process.exit(1);
    });


};


var dropTables = true;
db.sequelize.sync({force: dropTables}).then(function () {
    console.log('========syncing db complete========');
    var arrayFunc = [
        createAccounts,
        createCalendars,
        createEvents,
        createMembers,
        addMembersToEvent,
        createReminders,
        createReplications
    ];
    if (true) {
        async.waterfall(arrayFunc, function (err, results) {
            console.log('###########################');
            var status = 0;
            if (err) {
                console.log('ERROR:', err);
                status = 1;
            } else console.log('SUCCESS INSERTING', results);
            console.log('###########################');
            process.exit(status);
        });
    }
});
