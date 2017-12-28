

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class WuMartUsers extends BaseController {

        // index test
        async index() {
            this.response(200, 'index test successed');
        }


        async signIn() {

            const user = this.ctx.request.body;

            // user id and password dosen't exist
            if (!user.id || !user.password) {
                this.response(403, 'username and password required');
                return;
            }

            // user doesn't exist
            if (!await this.service.userswm.exists(user.id)) {
                this.response(403, `user doesn't exist`);
                return;
            }

            // password error
            if (user.password != this.app.config.password) {
                this.response(403, 'password error');
                return;
            }

            this.ctx.redirect('/public/web/district.html');
        }
    }

    return WuMartUsers;
}
