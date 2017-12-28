

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class CounterTypeConf extends BaseController {

        async index() {
            this.response(200, 'index test successed');
        }


        async getCounterTypeConf() {
            const counterTypeConf = await this.service.dbHelp.query('counterTypeConf', ['*'], {});
            this.response(200, counterTypeConf);
        }
    }

    return CounterTypeConf;
}