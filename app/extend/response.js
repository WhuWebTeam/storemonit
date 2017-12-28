

/**
 * Extend of koa response
 * @module response
 * @since 1.0.0
 */
module.exports = {

    /**
     * Response time of response a request
     * @public
     * @member Response#responseTime
     * @since 1.0.0
     */
    set responseTime(time) {
        this.set('x-response-time', time);
    },
}