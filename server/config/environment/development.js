'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/famkal-dev'
    },
    postgres: {
        dburl: 'postgres://famkal:allowfamkal@localhost:5432/famkal',
        logging: console.log,
        ssl: false
    },

    seedDB: true
};
