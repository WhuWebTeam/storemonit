

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Customer extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }


        // get customers' info
        async getCustomers() {
            const customers = await this.service.customers.query({});
            this.response(200, customers);
        }


        // get some customers info  specified by id or name
        async getCustomer() {
            const customer = this.ctx.request.body;
            customer = await this.service.customers.query(customer);
            this.response(200, customer);
        }


        // add a new customer info
        async addCustomer() {

            const customer = this.ctx.request.body;

            // customer exists
            if (!await this.service.customers.insert(customer)) {
                this.response(203, 'customer exists');
                return;
            }

            this.response(203, 'add a new customer successed');
        }
    }

    return Customer;
}