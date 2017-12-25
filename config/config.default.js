const path = require('path');


/**
 * The default configuration of StoreMonitor system
 * @class Config
 * @since 1.0.0
 */
module.exports = appInfo => {
    const Config = {

        /**
         * Key that sign cookies
         * @member {String} Config#keys
         * @since 1.0.0
         */
        keys: appInfo.name + 'StoreMonitor' + new Date(),


        /**
         * Set some security options of StoreMonitor system
         * @member {Object} Config#security
         * @property {Object} csrf - safe validate options
         * @property {Boolean} csrf.ignoreJSON - allow StoreMonitor System to ignore validate json data
         * @since 1.0.0
         */
        security: {
            csrf: {
                ignoreJSON: true,
            }
        },


        /**
         * The name of this application
         * @member {String} Config#name
         * @since 1.0.0
         */
        name: appInfo.name,


        /**
         * The current directory of the application
         * @member {Stirng} Config#pkg
         * @since 1.0.0
         */
        pkg: appInfo.pkg,


        /**
         * The directory of server running, You can find `application_config.json` under it that is dumpped from `app.config`
         * @member {String} Config#rundir
         * @since 1.0.0
         */
        rundir: path.join(appInfo.baseDir, `../${appInfo.name}Info/run`),


        /**
         * Options of egg log setting, set the log dir
         * @member {Object} Config#logger
         * @property {String} logger.dir - the egg's default path which logger in 
         * @since 1.0.0
         */
        logger: {
            dir: path.join(appInfo.baseDir, `../${appInfo.name}Info/log/logs`),
        },


        /**
         * Not found page setting
         * It will return 404 page, when request some directory doesn't exist
         * @member {Object} Config#notfound
         * @property {String} notfound.pageUrl - the 404 page url
         * @since 1.0.0
         */
        notfound: {
            pageUrl: '/public/404.html',
        },
    };


    /**
     * Default path of StoreMonitor System
     * @member {Object} Config#path
     * @property {String} path.infoDir - where info generated by StoreMonitor system exists
     * @property {String} path.logDir - where log generated by StoreMonitor system exists
     * @since 1.0.0
     */
    Config.path = {
        baseDir: appInfo.baseDir,
        infoDir: path.join(appInfo.baseDir, `../${appInfo.name}/Info`),
        logDir: path.join(appInfo.baseDir, `../${appInfo.name}Info/log`),
    };

    
    /**
     * level of wmuser
     * @member {Object} Config#userLevel
     * @property {Number} userLevel.manager - manager level
     * @property {Number} userLevel.storeManager - storeManager level
     * @property {NNumber} userLevel.districtManager -districtManager level
     * @since 1.0.0
     */
    Config.userLevel = {
        manager: 1,
        storeManager: 2,
        districtManager: 3
    };

    
    /**
     * Default Time config
     * @member {Object} Config#time
     * @property {String} time.graphShowTime - front-end's graph show time
     * @since 1.0.0
     */
    Config.time = {
        graphShowTime: '6 m',
        checkerResponseTime: [3, 5]
    }

    Config.password = 'wesine027';

    return Config;
}