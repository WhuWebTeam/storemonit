const StartTime = Symbol('Application#startTime');

/**
 * Extends of koa application
 * @module application
 * @since 1.0.0
 */
module.exports = {

    /**
     * StartTime of system run time
     * @public
     * @member Application#startTime
     * @since 1.0.0
     */
    get startTime() {
        if (!this[StartTime]) {
            this[StartTime] = Date.parse(new Date());
        }

        return this[StartTime];
    },


    /**
     * Application extend demo
     * @public
     * @method application#demo
     * @param {Object} param - parameter of function extendTest
     * @since 1.0.0 
     */
    demo(param) {
        console.log(`I am application extend demo, param values: ${param}`)
    }
}