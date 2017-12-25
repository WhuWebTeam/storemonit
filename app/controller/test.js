module.exports = app => {
    class Test extends app.Controller {
        async ctxLength() {
            this.ctx.body = {
                code: 200,
                data: {
                    database: this.app.config.database,
                    env: this.app.config.env

                }
            }
        }
    }

    return Test;
}