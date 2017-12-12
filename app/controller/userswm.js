module.exports = app => {
    class WuMartUsers extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successful'
                }
            };
        }


        async signIn() {
            const user = this.ctx.request.body;

            // user id and password dosen't exist
            if (!user.id || !user.password) {
                this.ctx.body = this.service.util.generateResponse(403, 'username and password required');
                return;
            }

            // user doesn't exist
            if (!await this.service.userswm.exists(user.id)) {
                this.ctx.body = this.service.util.generateResponse(403, 'user does not exist');
                return;
            }

            // password error
            if (user.password != this.app.config.password) {
                this.ctx.body = this.service.util.generateResponse(403, 'password error');
                return;
            }

            this.ctx.redirect('/public/web/district.html');
        }
    }

    return WuMartUsers;
}