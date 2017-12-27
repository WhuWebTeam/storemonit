

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Counters extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }


        // get counters info assigned to some user
        async getMyCounter() {

            // get userId
            const user = this.ctx.params.userId;

            if (!await this.service.userswm.exists(user)) {
                this.response(400, `user doesn't exist`);
                return;
            }

            const str = `select c.id, shopId, c.typeId from counters c
                        inner join counterUser cu on c.id = cu.counterId
                        where cu.userId =  $1 order by c.id`;

            try {
                const counters = await this.app.db.query(str, [user]);
                for (const counter of counters) {
                    const countersTemp = [];
                    counter.type = null;
                    if (counter.typeid) {
                        const type = await this.service.dbHelp.query('counterTypeConf', ['type'], { id: counter.typeid });
                        counter.type = type[0].type || null;
                    }
                    countersTemp.push(counter);
                }
                this.response(200, counters);
            } catch (err) {
                this.response(400, `get my counter's info failed`);
            }
        }


        // get counters have been assigned
        async getCountersAssigned() {

            const counters = await this.service.counters.query({ assigned: true }, ['id', 'shopId']);

            this.response(200, counters);
        }


        // get counters haven't been assigned
        async getCountersNotAssigned() {
            const counters = await this.service.counters.query({ assigned: false }, ['id', 'shopId', 'type']);
            this.response(200, counters);
        }


        async getCounterByShopId() {

            const shopId = this.ctx.params.shopId;
            const countersTemp = [];
            const counters = await this.service.counters.query({ shopId });

            for (const counter of counters) {
                counter.type = null;
                if (counter.typeid) {
                    const type = await this.service.dbHelp.query('counterTypeConf', ['type'], { id: counter.typeid });
                    counter.type = type[0].type || null;
                }
                countersTemp.push(counter);
            }
            this.response(200, counters);
        }

        // modify info of some counter specified by id
        async modifyCounter() {

            const id = this.ctx.params.counterId;
            let counter = this.ctx.request.body;
            counter.id = id;

            if (!await this.service.counters.update(counter)) {
                this.response(403, `update counter's info failed`);
                return;
            }

            this.response(203, 'update counter info successed');
        }


        // add a new counter
        async addCounter() {

            const counter = this.ctx.request.body;
            const id = this.ctx.params.counterId;
            counter.id = id;

            // counter exists
            if (!await this.service.counters.insert(counter)) {
                this.response(400, 'counter exists');
                return;
            }

            this.response(203, 'add a new counter successed');
        }


        async deleteCounters() {

            const counters = this.ctx.request.body;
            let del = true;

            for (const counter of counters.counters) {
                if (!await this.service.counters.delete({ id: counter.id })) {
                        del = false;
                    }
            }

            if (!del) {
                this.response(403, 'delete some counter failed');
                return;
            }

            this.response(203, 'delete counters satisfied condition successed');
        }
    }

    return Counters;
}