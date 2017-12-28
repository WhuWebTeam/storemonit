

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class ProductSalesInfo extends BaseController {

        async index() {
            this.response(200, 'index test successed');
        }
    }

    return ProductSalesInfo;
}