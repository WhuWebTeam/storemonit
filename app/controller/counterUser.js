

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class CounterUser extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }


        // assign some counter specified by counter id to some users specified by userId
        async assignCounters() {

            // get userId and counterIds
            const userId = this.ctx.params.userId;
            const counters = this.ctx.request.body;

            // counter assigned flag
            let assigned = true;
            for (const counter of counters.counters) {
                console.log(counters);
                if (!await this.service.counterUser.insert({ userId, counterId: counter.counterId, type: counter.type })) {
                    assigned = false;
                }

                await this.service.counters.update({ assigned: true }, { id: counter.counterId });
            }

            if (!assigned) {
                this.response(403, 'assign some counters failed');
                return;
            }

            this.response(203, 'assign counters successed');
        }


        // retrieve some counters from some user
        async retrieveCounters() {

            const userId = this.ctx.params.userId;
            const counters = this.ctx.request.body;

            let retrive = true;
            for (const counter of counters.counters) {
                if (!await this.service.counterUser.delete({ userId, counterId: counter.counterId })
                    || await this.service.counters.update({ assigned: false}, { id: counter.counterId})) {
                    retrive = false;
                }
            }

            // retrive some counter failed
            if (!retrive) {
                this.response(404, 'retrieve some counter failed');
                return;
            }

            this.response(204, 'retrieve counter successed');
        }


        // retrive some users' all counters
        async oneKeyRetrive() {

            // get the user's id
            const user = this.ctx.params.userId;

            // set counters' status of this user
            let str = `update counters c set assigned = false
                        where c.id in(
                            select counterId from counterUser where userId = $1)`;

            try {
                await this.app.db.query(str, [user]);

                // retrive counters from some user
                if (!await this.service.counterUser.delete({ userId: user })) {
                    this.response(404, 'retrieve some counter failed');
                    return;
                }

                this.response(204, 'retrieve counter satisfied condition successed');
            } catch (err) {
                this.response(404, 'retrieve some counter satisfied condition failed');
            }
        }
    }

    return CounterUser;
}