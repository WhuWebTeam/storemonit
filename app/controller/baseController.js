

/**
 * Base Controller calss of all controller file
 * @module baseController
 * @since 1.0.0
 */
module.exports = app => {
    class BaseController extends app.Controller {
        
        /**
         * Response request of the system
         * @public
         * @method BaseController#response
         * @param {Number} code - status code of response to request 
         * @param {[Object | String]} message - response body 
         */
        response(code, message) {
            
            // failed to response request
            if(+code >= 399) {
                this.ctx.body = {
                    code,
                    message,
                };
                return;
            }

            // succeed to response request but response body just to indicate successed
            if(typeof message === 'string') {
                this.ctx.body = {
                    code,
                    data: {
                        info: message
                    },
                };
                return;
            }

            // succeed to response request and response body include excute result
            this.ctx.body = {
                code,
                data: message
            }
        }
    }

    return BaseController;
}