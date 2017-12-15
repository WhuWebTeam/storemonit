

module.exports = app => {
    class Counters extends app.Controller {
        
        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // get counters info assigned to some user
        async getMyCounter() {

            // get userId
            const user = this.ctx.params.userId;

            if (!await this.service.userswm.exists(user)) {
                this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
                return;
            }

            const str = `select c.id, shopId, c.type from counters c
                        inner join counterUser cu on c.id = cu.counterId
                        where cu.userId =  $1 order by c.id`;

            try {
                const counters = await this.app.db.query(str, [user]);
                this.ctx.body = {
                    code: 200,
                    data: counters
                };
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(400, 'get mycounter info failed');
            }
        }


        // get counters have been assigned
        async getCountersAssigned() {
            
            const counters = await this.service.counters.query({ assigned: true }, ['id', 'shopId']);

            this.ctx.body = {
                code: 200,
                data: counters
            };
        }


        // get counters haven't been assigned
        async getCountersNotAssigned() {
            const counters = await this.service.counters.query({ assigned: false }, ['id', 'shopId', 'type']);
            this.ctx.body = {
                code: 200,
                data: counters
            };
        }


        async getCounterByShopId() {
            const shopId = this.ctx.params.shopId;

            const countersTemp = [];
            const counters = await this.service.counters.query({ shopId });
            for (const counter of counters) {
                counter.type = await this.service.dbHelp.query('counterTypeConf', ['type'], { id: counter.typeId })[0] || null;
                countersTemp.push(counter);
            }
            this.ctx.body = {
                code: 200,
                data: counters
            };
        }

        // modify info of some counter specified by id
        async modifyCounter() {
            const id = this.ctx.params.counterId;

            // counter without id attribute
            let counter = this.ctx.request.body;

            // add attribute id to counter object
            counter.id = id;

            if (!await this.service.counters.update(counter)) {
                this.ctx.body = this.service.util.generateResponse(403, 'update counter info failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'update counter info successed');
        }


        // add a new counter
        async addCounter() {
            const counter = this.ctx.request.body;
            const id = this.ctx.params.counterId;
            counter.id = id;

            // counter exists
            if (!await this.service.counters.insert(counter)) {
                this.ctx.body = this.service.util.generateResponse(400, 'counter exists');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add counter successed');
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
                this.ctx.body = this.service.util.generateResponse(403, 'delete some counters failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'delete counters satisfied condition successed');
        }
    }

    return Counters;
}