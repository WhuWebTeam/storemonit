const AccessTime = Symbol('Context#accessTime');

/**
 * Extend of koa context
 * @module context
 * @since 1.0.0
 */
module.exports = {

    /**
     * AccessTime of user access system
     * @public
     * @member Context#accessTime
     * @since 1.0.0
     */
    get accessTime() {
        if (!this[AccessTime]) {
            this[AccessTime] = Date.parse(new Date());
        }

        return this[AccessTime];
    },

    
    /**
     * Context extend demo
     * @public
     * @method Context#demo
     * @param {Object} param
     * @return {Object}
     * Object of parameter pass to demo
     * @since 1.0.0
     */
    demo(param) {
        return param;
    },
}