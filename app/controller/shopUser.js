

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class ShopUser extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }

        // assigned shops to some user
        async assignedShops() {

            const user = this.ctx.params.userId;
            const shops = this.ctx.request.body;
            let assigned = true;

            for (const shop of shops.shops) {
                if (!await this.service.shopUser.insert({ userId: user, shopId: shop.shopId, type: shop.type }, 1)) {
                    assigned = false;
                }
            }

            if (!assigned) {
                this.response(403, 'assigned some shops failed');
                return;
            }

            this.response(203, 'assigned shops successed');
        }


        // retrive shops from some user
        async retriveShops() {

            const user = this.ctx.params.userId;
            const shops = this.ctx.request.body;
            let retrive = true;

            for (const shop of shops.shops) {
                if (!await this.service.shopUser.delete({ shopId: shop.shopId, userId: user })) {
                    retrive = false;
                }
            }

            if (!retrive) {
                this.response(404, 'retrieve some shops failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'retrive shops from user successed');
        }


        // retrive some user's all shop
        async oneKeyRetrive() {

            const user = this.ctx.params.userId;

            if (!await this.service.shopUser.delete({ userId: user })) {
                this.response(404, 'retrieve shops failed');
                return;
            }

            this.response(204, 'retrieve shops successed');
        }
    }

    return ShopUser;
}