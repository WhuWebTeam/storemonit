

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class CustomerSalesInfo extends BaseController {

        async index() {
            this.response(200, 'index test successed');
        }
    }

    return CustomerSalesInfo;
}