module.exports = app => {
    class Test extends app.Controller {
        async ctxLength() {
            console.log(this.ctx.length);
            this.ctx.body = this.service.util.generateResponse(200, 'test successed');
        }
    }

    return Test;
}