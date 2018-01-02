

/**
 * Report request time of system
 * @module report
 * @since 1.0.0
 */
module.exports = (options, app) => {

    return async (ctx, next) => {
        
        // request start time
        const start = Date.parse(new Date());
        await next();

        // reqeust time spent
        const interval = Date.parse(new Date()) - start;
    }
}