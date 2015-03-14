module.exports = {

    accounts: [
        {
            first_name: 'Harvey',
            last_name: 'Daclan',
            email: 'harvey.daclan@gmail.com',
            address: 'Hollendergata 3A',
            zipcode: '4616',
            mobile: '96681923',
            password: 'harveyD',
            salt: 'harvey'
        },
        {
            first_name: 'Terje',
            last_name: 'Klungland',
            email: 'terje.klungland@gmail.com',
            address: 'Gate 3A',
            zipcode: '4689',
            mobile: '98745632',
            password: 'terjeK',
            salt: 'terje-k'
        },
        {
            first_name: 'Terje',
            last_name: 'Skåtterød',
            email: 'terje.skåtterød@gmail.com',
            address: 'Gate 3C',
            zipcode: '4623',
            mobile: '32145698',
            password: 'terjeS',
            salt: 'terje-s'
        },
        {
            first_name: 'Bjørge',
            last_name: 'Stølen',
            email: 'bjørge.stølen@gmail.com',
            address: 'Gate 3C',
            zipcode: '4623',
            mobile: '32145698',
            password: 'bjørgeS',
            salt: 'terje-s'
        }
    ]
    ,
    calendars: [
        {
            name: 'Harveys Calendar',
            display_name: 'Harveys Calendar',
            description: 'Min personlig kalender'
        },
        {
            name: 'Terje Ks Calendar',
            display_name: 'Terjes Calendar',
            description: 'Min personlig kalender'
        },
        {
            name: 'Terje S Calendar',
            display_name: 'Terjes Calendar',
            description: 'Min personlig kalender'
        },
        {
            name: 'Bjøreges Calendar',
            display_name: 'Bjøreges Calendar',
            description: 'Min personlig kalender'
        }
    ],
    events: [
        {
            title: 'Event 1',
            location: 'Oslo',
            description: 'Event 1 i Oslo',
            dt_start: new Date(),
            dt_end: new Date()
        },
        {
            title: 'Event 2',
            location: 'Bergen',
            description: 'Event 2 i Bergen',
            dt_start: new Date(),
            dt_end: new Date()
        },
        {
            title: 'Event 3',
            location: 'Trondheim',
            description: 'Event 3 i Trondheim',
            dt_start: new Date(),
            dt_end: new Date()
        },
        {
            title: 'Event 4',
            location: 'Stavanger',
            description: 'Event 4 i Stavanger',
            dt_start: new Date(),
            dt_end: new Date()
        }
    ],
    members: [
        {
            name: 'Walter',
            account_id: null,
            status: 'active'
        },
        {
            name: 'Thomas',
            account_id: null,
            status: 'active'
        },
        {
            name: 'Erling',
            account_id: null,
            status: 'inactive'
        },
        {
            name: 'Ingunn',
            account_id: null,
            status: 'pending'
        }
    ],
    reminders:[
        {
            name: 'minutes',
            event_id: null,
            value: 60
        },
        {
            name: 'hours',
            event_id: null,
            value: 2
        },
        {
            name: 'days',
            event_id: null,
            value: 2
        },
        {
            name: 'weeks',
            event_id: null,
            value: 1
        }

    ],
    replications: [
        {
            name: 'daily',
            event_id: null,
            limit: new Date()
        },
        {
            name: 'weekly',
            event_id: null,
            limit: new Date()
        },
        {
            name: 'monthly',
            event_id: null,
            limit: new Date()
        },
        {
            name: 'yearly',
            event_id: null,
            limit: new Date()
        }
    ],
    limitValues: [
        {
            limit: 14,
            unit: 'days'
        },
        {
            limit: 3,
            unit: 'weeks'

        },
        {
            limit: 6,
            unit: 'months'
        },
        {   limit: 2,
            unit: 'years'
        }
    ]
};