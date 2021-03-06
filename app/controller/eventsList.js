

/**
 * Controller class of table eventsList
 * @module eventsList
 * @since 1.0.0
 */
module.exports = app => {

    const BaseController = require('./baseController')(app);

    class EventsList extends BaseController {

        /**
         * Index test
         * @public
         * @method EventsList#index
         * @since 1.0.0
         */
        async index() {
            this.response(200, 'index test successed');
        }


        /**
         * Get count of eventsList total, unconfirmed, confirmed
         * @public
         * @method EventsList#getCount
         * @since 1.0.0
         */
        async getCount() {

            // get user's register code
            const userId = this.ctx.params.userId;
            const during = this.app.config.time.graphShowTime;

            const str = `select count(e.id) from eventsList e
                        inner join counters c on e.counterId = c.id and c.shopId = e.shopId
                        inner join counterUser cu on c.id = cu.counterId
                        where userId = $1 and e.status = $2 and to_timestamp(e.createAt) > now() - interval $3`;

            try {
                let working = await this.app.db.query(str, [userId, 0, during]);
                working = working[0] && +working[0].count || 0;

                let store = await this.app.db.query(str, [userId, 1, during]);
                store = store[0] && +store[0].count || 0;

                let commit = await this.app.db.query(str, [userId, 2, during]);
                commit = commit[0] && +commit[0].count || 0;

                this.response(200, {
                    working,
                    store,
                    commit
                });
            } catch(err) {
                this.response(400, `get user's eventsList count statistics failed`);
            }
        }

        /**
        * Get count of eventsList total, unconfirmed, confirmed
        * @public
        * @method EventsList#getManageDealCount
        * @since 1.0.0
        */
       async getManageDealCount() {

            const user = this.ctx.params.userId;
            const day = this.ctx.params.day;

            let str = `select to_char(to_timestamp(e.ts/1000), $2) as t, count(e.id) from eventsList e
                      inner join shopUser su on su.shopId = e.shopId
                      where su.userId = $1
                      group by t order by t desc`;
            let values = [user];

            switch(day.toLowerCase()) {
                case 'day':
                    values.push('YYYY-MM-DD');
                    break;
                case 'month':
                    values.push('YYYY-MM');
                    break;
                default:
                    str = `select count(transId), to_char(to_timestamp(ts/1000), 'YYYYMM') y, to_char(to_timestamp(ts/1000), 'W') w from eventsList e
                          inner join shopUser su on su.shopId = e.shopId
                          where su.userId = $1
                          group by y, w
                          order by y, w`;
                    break;
            }

            try {
                const eventsList = await this.app.db.query(str, values);
                this.response(200, eventsList);
            } catch(err) {
                this.response(400, 'get sotre count statistics failed');
            }
       }


        /**
         * Get the count of events wating to be dealed and completedthe last day
         * @public
         * @method EventsList#getDayCount
         * @since 1.0.0
         */
        async getDayCount() {

            const user = this.ctx.params.userId;

            try {
                let str = `select count(transId) from eventsList e
                        inner join shopUser su on e.shopId = su.shopId
                        where su.userId = $1 and e.status != 2`;


                let dealing = await this.app.db.query(str, [user]);
                dealing = dealing[0] && dealing[0].count || 0;

                // get count of events completed the last day
                str = `select count(et.sysKey) from eventTAT et
                      inner join shopUser su on et.shopId = su.shopId
                      where su.userId = $1 and et.type = 2 and to_timestamp(createAt) > now() - interval '1 d'`;


                let completed = await this.app.db.query(str, [user]);
                completed = completed[0] && completed[0].count || 0;

                this.response(200, {
                    dealing,
                    completed
                });
            } catch(err) {
                this.response(400, 'get day count statistics of failed');
            }
        }


        /**
         * Get rate of events occurating time during some time
         * @public
         * @method EventsList#getEventRate
         * @since 1.0.0
         */
        async getEventsRate() {

            const user = this.ctx.params.userId;
            const time = this.ctx.params.day;

            // set the duration time
            const values = [user];
            switch(time.toLowerCase()) {
                case 'week':
                    values.push(7);
                    break;
                case 'month':
                    values.push(30);
                    break;
                case '3month':
                    values.push(90);
                    break;
                default:
                    values.push(180);
                    break;
            }

            try {
                // get the count of bills during the limit time
                let str = `select count(transId) from bills b
                          inner join shopUser su on su.shopId = b.shopId
                          where userId = $1 and to_timestamp(ts) > now() - interval '$2 day'`;
                let bills = await this.app.db.query(str, values);
                bills = bills[0] && bills[0].count || 0;


                // get the count of events during the limit time
                str = `select count(transId) from eventsList e
                      inner join shopUser su on su.shopId = e.shopId
                      where userId = $1 and to_timestamp(ts) > now() - interval '$2 day'`;
                let events = await this.app.db.query(str, values);
                events = events[0] && events[0].count || 0;

                this.response(200, {
                    bills,
                    events
                });
            } catch(err) {
                this.response(400, 'get events rate failed');
            }
        }


        async getErrorRateGraph() {
            const user = this.ctx.params.userId;
            let str = `select count(b.transId), b.shopId from  bills b
                      inner join shopUser su on b.shopId = su.shopId
                      where to_timestamp(ts) > now() - interval '6 m' and userId = $1
                      group by b.shopId order by b.shopId`;
            const rates = [];
            try {
                const bills = await this.app.db.query(str, [user]);

                str = `select count(e.transId), e.shopId from  eventsList e
                      inner join shopUser su on e.shopId = su.shopId
                      where to_timestamp(ts) > now() - interval '6 m' and userId = $1
                      group by e.shopId order by e.shopId`;
                const eventsList = await this.app.db.query(str, [user]);
                for (let i = 0; i < bills.length && i < eventsList.length; i++) {
                    if (bills[i].shopId === eventsList[i].shopId) {
                        const rate = {};
                        rate.total = bills[i].count;
                        rate.shopId = bills[i].shopid;
                        rate.error = eventsList[i].count;
                        rates.push(rate);
                    }
                }
                this.response(200, rates);
        } catch (err) {
            this.response(400, 'get store error rate statistics failed');
        }
    }


        /**
         *  get the error rate of list of shops(day: 'week', 'month', '3month', '6month')
         * @method EventsList#getErrorRateList
         * @since 1.0.0
         */
        async getErrorRateList() {

            const user = this.ctx.params.userId;
            const time = this.ctx.params.day;
            const values = [user];

            // set the duration time
            switch(time.toLowerCase()) {
                case 'week':
                    values.push(7);
                    break;
                case 'month':
                    values.push(30);
                    break;
                case '3month':
                    values.push(90);
                    break;
                default:
                    values.push(180);
                    break;
            }

            try {
                const str = `select name, c.id, total, error, errorRate from cashiers c
                            inner join(
                                select tol.cashierId, total, error, error / total errorRate
                                from (
                                    select count(e.transId) error, e.shopId, e.cashierId from  eventsList e
                                    inner join shopUser su on e.shopId = su.shopId
                                    where to_timestamp(ts) > now() - interval '$2 d' and userId = $1
                                    group by e.shopId, e.cashierId order by e.shopId, e.cashierId) err
                                inner join (
                                    select count(b.transId) total, b.shopId, b.cashierId from  bills b
                                    inner join shopUser su on b.shopId = su.shopId
                                    where to_timestamp(ts) > now() - interval '$2 d' and userId = $1
                                    group by b.shopId, b.cashierId order by b.shopId, b.cashierId) tol on err.shopId = tol.shopId and err.cashierId = tol.cashierId
                                    ) r on c.id = r.cashierId`;
                const errorRate = await this.app.db.query(str, values);
                this.response(200, errorRate);
            } catch(err) {
                this.response(400, `get cashiers event rate failed`);
            }
        }

        /**
         * Get list of eventsList record
         * @public
         * @method EventsList#getEventListByStatus
         * @since 1.0.0
         */
        async getEventListByStatus() {

            const userId = this.ctx.params.userId;
            const status = +this.ctx.params.status || 0;
            const during = this.app.config.time.graphShowTime;

            const str = `select sysKey, cashierId, cashierName, e.counterId, counterType, transId, createAt, editResult, e.shopId
                        from eventsList e
                        inner join counters c on e.counterId = c.id and e.shopId = c.shopId
                        inner join counterUser cu on cu.counterId = e.counterId
                        where cu.userId = $1 and to_timestamp(createAt) > now() - interval $2 and status = $3`;

            try {
                let eventsList = await this.app.db.query(str, [userId, during, status]);
                this.response(200, eventsList);
            } catch(err) {
                this.response(400, 'get info of events count in some condition failed');
            }
        }


        /**
         * Get list of eventsList record
         * @public
         * @method EventsList#getManageEventListByStatus
         * @since 1.0.0
         */
        async getManageEventListByStatus() {

            const userId = this.ctx.params.userId;
            const status = +this.ctx.params.status || 0;
            const during = this.app.config.time.graphShowTime;

            const str = `select sysKey, cashierId, cashierName, e.counterId, counterType, transId, createAt, editResult
                        from eventsList e
                        inner join shopUser su on su.shopId = e.shopId
                        where su.userId = $1 and to_timestamp(createAt) > now() - interval $2 and status = $3`;

            try {
                let eventsList = await this.app.db.query(str, [userId, during, status]);
                this.response(200, eventsList);
            } catch(err) {
                this.response(400, 'get info of events count in some condition failed');
            }
        }


        /**
         * Get list of eventsList record by status and editResult
         * @public
         * @method EventsList#getEventList
         * @since 1.0.0
         */
        async getEventList() {

            const status = +this.ctx.params.status || 0;
            const editResult = this.ctx.params.result || '';

            const eventsList = await this.service.eventsList.query({ status, editResult }, ['sysKey', 'cashierId', 'cashierName',
                'counterId', 'counterType', 'transId', 'createAt', 'editResult']);
            this.response(200, eventsList);
        }


        /**
         * Get statistics graph of eventsList record
         * @public
         * @method EventsList#getEventsListGraph
         * @since 1.0.0
         */
        async getEventsListGraph() {
            const day = this.ctx.params.day || 'day';

            const eventsList = await this.service.eventsList.getEventsListGraph(day);
            this.response(200, eventsList);
        }


        /**
         * Get some event's edit info
         * @public
         * @method EventsList#getEditInfo
         * @since 1.0.0
         */
        async getEditInfo() {

            const sysKey = this.ctx.params.sysKey;

            // get eventsList and price
            const eventList = await this.service.eventsList.query({ sysKey }, ['transId', 'createAt', 'editResult', 'status', 'videoUrl',
                'comments', 'productName','cashierId', 'cashierName', 'shopId']);
            const price = await this.service.bills.query( { sysKey }, ['price']);
            eventList.price = price && price.price || 0;

            this.response(200, eventList);
        }


        /**
         * Modify some eventList's info
         * @public
         * @method EventsList#eventEdit
         * @since 1.0.0
         */
        async eventEdit() {

            // sysKey and editInfo
            const sysKey = this.ctx.params.sysKey;
            const editInfo = this.ctx.request.body;
            let flag = 0;

            // format eventList update info
            const eventList = {};
            eventList.editResult = editInfo.editResult;
            eventList.comments = editInfo.comments;
            eventList.productName = editInfo.productName;
            eventList.status = 1;
            if (!await this.service.eventsList.update(eventList, { sysKey })) {
                flag = 1;
            }

            // format bill update info
            const bill = {};
            bill.sysKey = sysKey;
            bill.price = editInfo.price;
            if (!await this.service.bills.update(bill, { sysKey })) {
                flag = 2;
            }

            // format product update info
            const product = {};
            const productId = await this.service.bills.query({ sysKey }, ['productId']);
            product.name = editInfo.productName;
            if(!await this.service.products.update( product ,{ id: productId.productid })) {
                flag = 3;
            }

            switch(flag) {
                case 1:
                    this.response(403, 'update eventsList info failed');
                    return;
                case 2:
                    this.response(403, 'update bill info failed');
                    return;
                case 3:
                    this.response(403, 'update product info failed');
                    return;
                default:
                    this.response(203, 'edit eventsList info successed');
            };
        }


        /**
         * Commit some eventList, set its status to 2
         * @public
         * @method EventsList#commitEventList
         * @since 1.0.0
         */
        async commitEventList() {

            // eventList's sysKey
            const sysKey = this.ctx.params.sysKey;

            if (!await this.service.eventsList.update({ status: 2}, { sysKey })) {
                this.response(403, 'commit eventList failed');
                return;
            }

            this.response(203, 'commit eventList successed');
        }


        /**
         * Store some eventList, set its status to 1
         * @public
         * @method EventsList#storeEventList
         * @since 1.0.0
         */
        async storeEventList() {

            // eventList's sysKey
            const sysKey = this.ctx.params.sysKey;

            if (!await this.service.eventsList.update( {status: 1 }, { sysKey })) {
                this.response(403, 'store eventList failed');
                return;
            }

            this.response(203, 'store eventsList successed');
        }


        /**
         * Commit some eventsList, set their status to 2
         * @public
         * @method EventsList#commitEventsList
         * @since 1.0.0
         */
        async commitEventsList() {

            // array includes eventsList's sysKey
            const eventsList = this.ctx.request.body;

            // commit successed flag
            let commit = 1;

            for (const eventList of eventsList.sysArr) {
                if (!await this.service.eventsList.update({ status: 2 }, { sysKey: eventList.sysKey })) {
                    commit = 0;
                }
            }

            if (!commit) {
                this.response(403, 'commit some eventList failed');
                return;
            }

            this.response(203, 'commit eventsList satisfied condition successed');
        }


        /**
         * Store some eventsList, set their status to 1
         * @public
         * @method EventsList#StoreEventsList
         * @since 1.0.0
         */
        async StoreEventsList() {

            // array includes eventsList's sysKey
            const eventsList = this.ctx.request.body;

            // store successed flag
            let store = 1;

            for (const eventList of eventsList) {
                if (!await this.service.eventsList.update({ status: 1 }, { sysKey: eventList.sysKey })) {
                    store = 0;
                }
            }

            if (!store) {
                this.response(403, 'store some eventList failed');
                return;
            }

            this.response(203, 'store eventsList successed');
        }
    }

    return EventsList;
}
