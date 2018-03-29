

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Index extends BaseController {

        // wm supermarket checker api
        async checker() {

            const wmUserId = this.ctx.query.userid;
            const userName = this.ctx.query.name;
            const wmUserLvl = 1;
            const shopId = this.ctx.query.shopid;
            const token = this.ctx.query.token;

            if (!this.validateToken(token)) {
                this.ctx.redirect.redirect('/public/404.html');
                return;
            }

            if (!await this.existOrInsert({ wmUserId, userName, wmUserLvl })) {
                this.ctx.response(403,  `update user's info failed`);
                return;
            }

            const assigned = await this.service.counterUser.count({ userId: wmUserId }, ['id']);
            if (assigned) {
                this.ctx.redirect(`/public/checker.html?userId=${wmUserId}&shopId=${shopId}`);
                return;
            }

            this.ctx.redirect(`/public/checkout.html?userId=${wmUserId}&shopId=${shopId}`);
            return;
        }

        
        // wm supermarket manager api
        async manager() {

            const wmUserId = this.ctx.query.userid;
            const userName = this.ctx.query.name;
            const wmUserLvl = 2;
            const shopId = this.ctx.query.shopid;
            const token = this.ctx.query.token;

            if (!this.validateToken(token)) {
                this.ctx.redirect.redirect('/public/404.html');
                return;
            }

            if (!await this.existOrInsert({ wmUserId, userName, wmUserLvl })) {
                this.ctx.response(403,  `update user's info failed`);
                return;
            }

            this.ctx.redirect(`/public/storeManager.html?userId=${wmUserId}&shopId=${shopId}`);
        }

        
        // wm supermarket chief api
        async chief() {

            const wmUserId = this.ctx.query.userid;
            const userName = this.ctx.query.name;
            const wmUserLvl = 3;
            const shopId = this.ctx.query.shopid;
            const token = this.ctx.query.token;

            if (!this.validateToken(token)) {
                this.ctx.redirect.redirect('/public/404.html');
                return;
            }

            if (!await this.existOrInsert({ wmUserId, userName, wmUserLvl })) {
                this.ctx.response(403,  `update user's info failed`);
                return;
            }

            const assigned = await this.service.shopUser.count({ userId: wmUserId }, ['id']);
            if (assigned) {
                this.ctx.redirect(`/public/districtManager.html?userId=${wmUserId}&shopId=${shopId}`);
                return;
            }

            this.ctx.redirect(`/public/addShop.html?userId=${wmUserId}&shopId=${shopId}`);
            return;            
        }

        // validate token right or not
        validateToken(token) {
            return true;
        }

        // update userswm table
        async existOrInsert(wmUser) {
            
            if (await this.service.userswm.exists(wmUser.wmUserId)) {
                return true;
            }

            return await this.service.userswm.insert(wmUser);
        }


        // // Wu mei redirect api
        // async wmHome() {

        //     // get wu mei user's info about authority and exists or not
        //     const userId = this.ctx.params.userId;
        //     let level = await this.service.userswm.query({ wmUserId: userId }, ['wmUserLvl']);
        //     level = level && +level.wmuserlvl || 1;

        //     // wu mei user is manager
        //     if (level === this.app.config.userLevel.manager) {
        //         const assigned = await this.service.counterUser.count({ userId }, ['id']);
        //         if (assigned) {
        //             this.ctx.redirect(`/public/checker.html?userId=${userId}`);
        //             return;
        //         }

        //         this.ctx.redirect(`/public/checkout.html?userId=${userId}`);
        //         return;
        //     }

        //     // wu mei user is store manager
        //     if (level === this.app.config.userLevel.storeManager) {
        //         this.ctx.redirect(`/public/storeManager.html?userId=${userId}`);
        //         return;
        //     }

        //     // wu mei user is district manager
        //     if (level === this.app.config.userLevel.districtManager) {
        //         const assigned = await this.service.shopUser.count({ userId }, ['id']);
        //         if (assigned) {
        //             this.ctx.redirect(`/public/districtManager.html?userId=${userId}`);
        //             return;
        //         }

        //         this.ctx.redirect(`/public/addShop.html?userId=${userId}`);
        //         return;
        //     }

        //     this.ctx.redirect.redirect('/public/404.html');
        // }


        // Clear all  record in database
        async clear() {

            const tables = [
                'authorities', 'counterUser', 'counters', 'shops', 'areas', 'products', 'customers', 'shopUser',
                'cashiers', 'bills', 'eventsList', 'cashierSalesInfo', 'customerSalesInfo', 'productSalesInfo', 'eventTAT',
                'users'
            ];

            try {
                tables.map(async table => {
                    const str = `delete from ${table}`;
                    await this.app.db.query(str);
                });

                this.response(204, 'clear database successed');
            } catch (err) {
                this.response(404, 'clear database failed');
            }
        }
    }

    return Index;
}