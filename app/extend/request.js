

/**
 * Extend of koa request
 * @module request
 * @since 1.0.0
 */
module.exprots = {

    /**
     * Request time of system
     * @public
     * @member Request#requestTime
     * @since 1.0.0
     */
    get requestTime() {
        console.log(this.get('x-request-time'));
        return this.get('x-request-time');
    }
}