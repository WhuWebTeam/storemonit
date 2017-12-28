

/**
 * Controller class EditResultList
 * @module editResultList
 * @since 1.0.0
 */
module.exports = app => {

    const BaseController = require('./baseController')(app);

    class EditResultList extends BaseController {

        /**
         * Index test
         * @public
         * @method EditResultList#index
         * @since 1.0.0
         */
        async index() {
            this.response(200, 'index test successed');
        }


        /**
         * Get all editResult which can be selected
         * @public
         * @method EditResultList#getAllEditResult
         * @since 1.0.0
         */
        async getAllEditResult() {
            const editResults = await this.service.editResultList.query({}, ['id', 'name']);
            this.response(200, editResults);
        }


        /**
         * Add a new editResult which can be selected to database
         * @public
         * @method EditReslutList#addEditReslut
         * @since 1.0.0
         */
        async addEditResult() {

            const editResult = this.ctx.request.body;

            if (!await this.service.editResultList.insert(editResult)) {
                this.ctx.body = this.service.util.generateResponse(404, 'add editResult failed');
                return;
            }

            this.response(203, 'add editResult successed');
        }
    }

    return EditResultList;
}