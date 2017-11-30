var pg = require('pg');

var config = {
    database: 'restaurant',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

module.exports = new pg.Pool(config)
