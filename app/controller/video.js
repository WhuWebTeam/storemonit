

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Video extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }


        // get data from DVA system
        async getDVAData() {

            const DVA = this.ctx.request.body;

            /* parse DVA data and store them to database */
            // format counter
            let counter = {};
            counter.id = DVA.RegID || '0000000000';
            counter.type = DVA.RegType || 'pos';
            counter.shopId = DVA.ShopID || '';
            if (!await this.service.counters.insert(counter)) {
                this.logger.error('insert counter record to table counters failed');
            } else {
                this.logger.info('insert counter record to table counters successed');
            }

            // format shop
            let shop = {};
            shop.id = DVA.ShopID || '0000000000';
            if (!await this.service.shops.insert(shop)) {
                this.logger.error('insert shop record to table shops failed');
            } else {
                this.logger.info('insert shops record to table successed');
            }

            // format cashier
            let cashier = {};
            cashier.id = DVA.CashierID || '0000000000';
            if (!await this.service.cashiers.insert(cashier)) {
                this.logger.error('insert cashier record to table cashiers failed');
            } else {
                this.logger.info('insert cashier record to table cashiers successed');
            }

            // format customer
            let customer = {};
            customer.id = DVA.CustomerID || '0000000000';
            if (!await this.service.customers.insert(customer)) {
                this.logger.error('insert customer record to table customers failed');
            } else {
                this.logger.info('insert customer record to table customers successed');
            }

            for (const [index, billEle] of DVA.Bills.entries()) {

                // format product
                let product = {};
                product.id = billEle.Sku || '0000000000';
                product.name = billEle.Text || '';
                if (!await this.service.products.insert(product)) {
                    this.logger.error('insert product record to table products failed');
                } else {
                    this.logger.info('insert product record to table products successed');
                }


                // format bill
                let bill = {};
                bill.sysKey = DVA.ShopID + DVA.TransID + billEle.Ts || '00000000000000000000000';
                bill.price = billEle.Price || 0;
                bill.amount = billEle.Amount || 0;
                bill.quantity = bill.price * bill.amount;
                bill.ts = billEle.Ts || 0;
                bill.scriptVer = DVA.ScriptVer || '';
                bill.eventFlag = billEle.Type || 'normal';
                bill.customerId = DVA.CustomerID || '0000000000';
                bill.transId = DVA.TransID || '';
                bill.shopId = DVA.ShopID || '0000000000';
                bill.counterId = DVA.RegID || '0000000000';
                bill.productId = billEle.Sku || '0000000000';
                bill.cashierId = DVA.CashierID || '0000000000';
                if (!await this.service.bills.insert(bill)) {
                    this.logger.error('insert bill record to table bills failed');
                } else {
                    this.logger.info('insert bill record to table bills successed');
                }


                this.logger.info('xxxxxx');
                // format eventList
                let eventList = {};
                eventList.sysKey = bill.sysKey;
                eventList.transId = DVA.TransID || '0000000000';
                eventList.ts = billEle.Ts || 0;
                eventList.createAt = Date.parse(new Date());
                eventList.videoUrl = billEle.VideoUrl || '';
                eventList.pic1Url = billEle.PictureUrl0 || '';
                eventList.pic2Url = billEle.PictureUrl1 || '';
                eventList.pic3Url = billEle.PictureUrl2 || '';
                eventList.pic4Url = billEle.PictureUrl3 || '';
                eventList.videoStartTime = billEle.Start || 0;
                eventList.videoEndTime = billEle.End || 0;
                eventList.productId = billEle.Sku || '0000000000';
                eventList.productName = billEle.Text || '';
                eventList.counterId = DVA.RegID || '0000000000';
                eventList.counterType = DVA.RegType || 'pos';
                eventList.cashierId = DVA.CashierID || '0000000000';
                eventList.shopId = DVA.ShopID || '0000000000';
                if (bill.eventFlag.toLowerCase() !== 'normal' &&  await this.service.eventsList.insert(eventList)) {
                    this.app.logger.error('insert eventList record to table eventsList successed');
                } else if (bill.eventFlag.toLowerCase() !== 'normal') {
                    this.logger.info('insert eventList record to table eventsList failed');
                }
            }

            this.response(200, 'add video record successed');
        }
    }

    return Video;
}