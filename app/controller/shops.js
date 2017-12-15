

module.exports = app => {
    class Shops extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // get user's shop
        async getMyShops() {
            const user = this.ctx.params.userId;
            const str = `select s.id, s.name, s.type from shops s
                        inner join shopUser su on s.id = su.shopId
                        where su.userId = $1`;

            if (!await this.service.userswm.exists(user)) {
                this.ctx.body = this.service.util.generateResponse(400, `user doesn.t exist`);
                return;
            }

            try {
                const shops = await this.app.db.query(str, [user]);
                this.ctx.body = {
                    code: 200,
                    data: shops
                };
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(400, `get my shops' info failed`);
            }
        }


        // get shops not assigned
        async getShopsNotAssainged() {
            const str = `select s.id, s.name, s.type from shops s
                        where s.id not in
                            (select shopId from shopUser)`;

            try {
                const shops = await this.app.db.query(str, []);
                this.ctx.body = {
                    code: 200,
                    data: shops
                };
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(400, `get shops not assigned failed`);
            }
        }


        // get shops assgined to some manager
        async getShopsAssigned() {
            const str = `select s.id, s.name, s.type from shops s
                        where s.id in
                            (select shopId from shopUser)`;

            try {
                const shops = await this.app.db.query(str, []);
                this.ctx.body = {
                    code: 200,
                    data: shops
                };
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(400, `get shops assigned failed`);
            }
        }


        async getShopsByAreaId() {
            const areaId = this.ctx.params.areaId;

            const shops = await this.service.shops.query({ areaId }, ['id', 'name']);
            this.ctx.body = {
                code: 200,
                data: shops
            };
        }


        // get all shop info
        async getShops() {

            const temp = [];

            const shops = await this.service.shops.query({}, ['id', 'name', 'details', 'areaId']);
            
            for (let i = 0; i < shops.length; i++) {
                const areaName = await this.service.areas.query({ id: shops[i].areaId }, ['name']);
                shops[i].areaName = areaName.name;
            }
            
            this.ctx.body = {
                code: 200,
                data: shops
            };
        }


        // modify some shop's info
        async modifyShop() {
            const id = this.ctx.params.shopId;
            const shop = this.ctx.request.body;
            shop.id = id;

            if (!await this.service.shops.update(shop, { id })) {
                this.ctx.body = this.service.util.generateResponse(403, 'modify shop info failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'modify shop info successed');
        }


        // add a new shop
        async addShop() {
            const id = this.ctx.params.shopId;
            const shop = this.ctx.request.body;
            shop.id = id;

            if (!await this.service.shops.insert(shop)) {
                this.ctx.body = this.service.util.generateResponse(403, 'add new shop failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'add new shop successed');
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
                this.ctx.body = this.service.util.generateResponse(403, 'delete some shop failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'delete shops successed');
        }
    }

    return Shops;
}