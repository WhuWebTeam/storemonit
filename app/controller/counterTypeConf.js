module.exports = app => {

    class CounterTypeConf extends app.Controller {

        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }


        async getCounterTypeConf() {
            const counterTypeConf = await this.service.dbHelp.query('counterTypeConf', ['*'], {});
            this.ctx.body = {
                code: 200,
                data: counterTypeConf
            }; 
        }
    }

    return CounterTypeConf;
}