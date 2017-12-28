

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Cashiers extends BaseController {

        // index test
        async index() {
            this.response(200, 'inde test successed');
        }


        // get cashiers info
        async getCashiers() {
            const cashiers = await this.service.cashiers.query({});
            this.response(200, cashiers);
        }


        // get info of cashier specified by id or name
        async getCashier() {
            let cashier = this.ctx.request.body;

            cashier = await this.service.cashiers.query(cashier);
            this.response(200, cashier);
        }


        // add a new cashier
        async addCashier() {
            const cashier = this.ctx.request.body;

            // cashier exists
            if (!await this.service.cashiers.insert(cashier)) {
                this.response(403, 'cashier exsits');
                return;
            }

            this.response(203, 'add new cashier info successed');
        }
    }

    return Cashiers;
}