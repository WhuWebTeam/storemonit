

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Products extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }


        // get info of all products
        async getProducts() {
            const products = await this.service.products.query({});
            this.response(200, products);
        }


        // get info of some product specified by id or name
        async getProduct() {
            let product = this.ctx.request.body;
            product = await this.service.products.query(product);
            this.response(200, product);
        }


        // add a new product info to database
        async addProduct() {
            const product = this.ctx.request.body;
            // product doesn't exists
            if (!await this.service.products.insert(product)) {
                this.response(404, 'product exists');
                return;
            }

            this.response(200, 'add product successed');
        }
    }

    return Products;
}