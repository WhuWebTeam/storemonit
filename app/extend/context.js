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
     * @since 1.0.0
     */
    demo(param) {
        console.log(`I am context extend demo, param value: ${param}`);
    },
}