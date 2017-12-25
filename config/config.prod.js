

module.exports = app => {
    const Config = {};

    /**
     * Default database configuration
     * Just start project through `egg-bin dev` command
     * @member {Object} Config#database
     * @property {Object} database.pg - configuration of database postgreSQL
     * @property {String} database.pg.user - username of postgreSQL database StoreMonitor system used
     * @property {String} database.pg.password - password of postgreSQL database StoreMonitor system used
     * @property {String} database.pg.database - database of postgreSQL database StoreMonitor system used
     * @property {String} database.pg.host - database's server ip of postfreSQL database StoreMonitor system used
     * @property {String} database.pg.port - database's server port of postgreSQL database StroeMonitor system used
     * @property {String} database.pg.poolSize - database's server process number
     * @since 1.0.0
     */
    Config.database = {
        pg: {
            user: 'company',
            password: '123',
            database: 'company',
            host: '127.0.0.1',
            port: '5432',
            poolSize: 5,
        }
    };


    return Config;
}