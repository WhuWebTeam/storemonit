

module.exports = app => {
    class Test extends app.Controller {
        async test1() {
            this.ctx.helper.demo('helper');
            this.ctx.body = this.service.util.generateResponse(200, 'test successed');
        }

        async test2() {
            this.ctx.response.responseTime = Date.parse(new Date());
            this.ctx.body = this.service.util.generateResponse(200, 'test successed');
        }
    }

    return Test;
}