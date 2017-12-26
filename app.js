const pgp = require('pg-promise')();

module.exports = app => {

    // pg-promise
    app.db = pgp(app.config.database.pg);
}