

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Shops extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }


        // get user's shop
        async getMyShops() {

            const user = this.ctx.params.userId;
            const str = `select s.id, s.name, s.type from shops s
                        inner join shopUser su on s.id = su.shopId
                        where su.userId = $1`;

            if (!await this.service.userswm.exists(user)) {
                this.response(400, `user doesn't exist`);
                return;
            }

            try {
                const shops = await this.app.db.query(str, [user]);
                this.response(200, shops);
            } catch (err) {
                this.response(400, `get my shops' info failed`);
            }
        }


        // get shops not assigned

        async getShopsNotAssainged() {

            const str = `select s.id, s.name, s.type from shops s
                        where s.id not in
                            (select shopId from shopUser)`;

            try {
                const shops = await this.app.db.query(str, []);
                this.response(200, shops);
            } catch (err) {
                this.response(400, `get shops not assigned failed`);
            }
        }


        // get shops assgined to some manager
        async getShopsAssigned() {

            const str = `select s.id, s.name, s.type from shops s
                        where s.id in
                            (select shopId from shopUser)`;

            try {
                const shops = await this.app.db.query(str, []);
                this.response(200, shops);
            } catch (err) {
                this.response(400, `get shops asigned failed`);
            }
        }


        async getShopsByAreaId() {
            const areaId = this.ctx.params.areaId;
            const shops = await this.service.shops.query({ areaId }, ['id', 'name']);
            this.response(200, shops);
        }


        // get all shop info
        async getShops() {

            const temps = [];
            const shops = await this.service.shops.query({}, ['id', 'name', 'details', 'areaId']);

            for (const shop of shops) {
                let areaName = null;
                if (shop.areaid) {
                    areaName = await this.service.areas.query({ id: shop.areaid }, ['name']);
                    areaName = areaName.name;
                }
                temps.push({
                    id: shop.id,
                    shopname: shop.name,
                    areaid: shop.areaId || null,
                    details: shop.details,
                    areaname: areaName
                });
            }

            this.response(200, temps);
        }


        // modify some shop's info
        async modifyShop() {

            const id = this.ctx.params.shopId;
            const shop = this.ctx.request.body;
            shop.id = id;

            if (!await this.service.shops.update(shop, { id })) {
                this.response(403, 'update shop info failed');
                return;
            }

            this.response(203, 'update shop info successed');
        }


        // add a new shop
        async addShop() {

            const id = this.ctx.params.shopId;
            const shop = this.ctx.request.body;
            shop.id = id;

            if (!await this.service.shops.insert(shop)) {
                this.response(403, 'add a new shop failed');
                return;
            }

            this.response(203, 'add a new shop successed');
        }


        // delete shops specified by ids
        async deleteShops() {
            const shops = this.ctx.request.body;
            let del = true;

            for (const shop of shops.shops) {
                if (!await this.service.shops.delete({ id: shop.id })) {
                    del = false;
                }
            }

            if (!del) {
                this.response(404, 'delete some shop failed');
                return;
            }

            this.response(203, 'delete shops successed');
        }
    }

    return Shops;
}