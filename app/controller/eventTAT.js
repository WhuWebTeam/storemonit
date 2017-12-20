

/**
 * Controller class of table eventTAT
 * @module eventTAT
 * @since 1.0.0
 */
module.exports = app => {
    class EventTAT extends app.Controller {

        /**
         * Index test
         * @public
         * @function eventTAT#index
         * @since 1.0.0
         */
        async index() {

            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }


        /**
         * get manager's response time(day: 'week', 'month', '3month', '6month')
         */
        async getResponseTime() {

            const user = this.ctx.params.userId;
            let time = this.ctx.params.day;

            // set the duration time
            switch(time.toLowerCase()) {
                case 'week':
                    time = 7;
                    break;
                case 'month':
                    time = 30;
                    break;
                case '3month':
                    time = 90;
                    break;
                default:
                    time = 180;
                    break;
            }

            try {
                let str = `select checkerId, checkerName, count(id)
                          from eventTAT
                          where now() - interval '$1 d'  < to_timestamp(createAt / 1000) 
                          and type = 2 and duration < 1000 * 60 * $2
                          and shopId in (
                              select shopId from shopUser
                              where userId = $3)
                          group by checkerId, checkerName
                          order by checkerId`;
                const count1 = await this.app.db.query(str, [time, this.app.config.time.checkerResponseTime[0], user]);

                str = `select checkerId, checkerName, count(id)
                      from eventTAT
                      where now() - interval '$1 d'  < to_timestamp(createAt / 1000) 
                      and type = 2 and duration > 1000 * 60 * $2 and duration < 1000 * 60 * $3
                      and shopId in (
                          select shopId from shopUser
                          where userId = $4)
                      group by checkerId, checkerName
                      order by checkerId`;
                const count2 = await this.app.db.query(str, [time, this.app.config.time.checkerResponseTime[0], this.app.config.time.checkerResponseTime[1], user]);

                str = `select checkerId, checkerName, count(id)
                      from eventTAT
                      where now() - interval '$1 d'  < to_timestamp(createAt / 1000) 
                      and type = 2 and duration > 1000 * 60 * $2
                      and shopId in (
                          select shopId from shopUser
                          where userId = $3)
                      group by checkerId, checkerName
                      order by checkerId`;
                const count3 = await this.app.db.query(str, [time, this.app.config.time.checkerResponseTime[2], user]);
                
                

                this.ctx.body = {
                    code: 200,
                    data: {
                        count1,
                        count2,
                        count3
                    }
                };
            } catch (err) {
                console.log(err);
                this.ctx.body = this.service.util.generateResponse(400, 'get checker response time failed');
            }
        }


        /**
         * Log open event's time(type:0)
         * @public
         * @function eventTAT#eventOpenTime
         * @since 1.0.0
         */
        async eventOpenTime() {
            
            // eventTAT'S sysKey
            const sysKey = this.ctx.params.sysKey;
            const eventTAT = this.ctx.request.body;
            eventTAT.sysKey = sysKey;

            if (!await this.service.eventTAT.eventLog(eventTAT, 0)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event open time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event open time successed');
        }


        /**
         * Log store event's time(type:1)
         * @public
         * @function eventTAT#eventStoreTime
         * @since 1.0.0
         */
        async eventStoreTime() {

            // eventTAT's sysKey
            const sysKey = this.ctx.params.sysKey;
            const eventTAT = this.ctx.request.body;
            eventTAT.sysKey = sysKey;
            console.log(eventTAT);

            if (!await this.service.eventTAT.eventLog(eventTAT, 1)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event store time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event store time successed');
        }


        /**
         * Log commit event's time(type:2)
         * @public
         * @function eventTAT#eventCommitTime
         * @since 1.0.0
         */
        async eventCommitTime() {

            // eventTAT's sysKey
            const sysKey = this.ctx.params.sysKey;
            const eventTAT = this.ctx.request.body;
            eventTAT.sysKey = sysKey;

            if (!await this.service.eventTAT.eventLog(eventTAT, 2)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event commit time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event commit time successed');
        }


        /**
         * Log many commit events' time(type:2)
         * @public eventTAT#eventCommitTimes
         * @function
         * @since 1.0.0
         */
        async eventCommitTimes() {

            // array includes eventTAT's sysKey
            const commits = this.ctx.request.body;
            let commit = 1;

            for (const eventTAT of commits.sysArr) {
                if(!await this.service.eventTAT.eventLog(eventTAT, 2)) {
                    commit = 0;
                };
            }

            // exists event commit log failed
            if (!commit) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event commit time failed');
                return;
            }

            // all event commit log successed
            this.ctx.body = this.service.util.generateResponse(201, 'log event commit time successed');
        }
    }

    return EventTAT;
}