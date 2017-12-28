

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class User extends BaseController {

        // user index page test
        async index() {
            this.response(200, 'index test successed');
        }


        // get users info
        async getUsers() {
            const users = await this.service.users.query({});
            this.response(200, users);
        }


        // get some user's info
        async getUser() {
            const user = this.ctx.request.body;
            const users = await this.service.users.query(user);
            this.response(200, users);
        }


        // change some user's level related to priority
        async changeAuthority() {

            // ..........   authority judge


            // modify user's authority
            const user = this.ctx.request.body;

            // user doesn't exist
            if (!await this.service.users.update(user)) {
                this.response(403, `set user's priority failed`);
                return;
            }

            // modify user's authority successed
            this.response(203, `set user's priority successed`);
        }


        // change some user's password
        async changePassword() {

            // ..........  authority judge


            const user = this.ctx.request.body;

            // user doesn't exist
            if (!await this.service.users.update(user)) {
                this.response(403, `set user's password failed`);
                return;
            }

            // modify user's password successed
            this.response(203, `set user's password successed`);
        }


        // modify info of user's specified by user's id
        async modifyUser() {

            // ........... authority judge


            const user = this.ctx.request.body;

            if (!await this.service.users.update(user)) {
                this.response(403, `update user's info failed`);
                return;
            }

            this.response(203, `update user's info successed`);
        }


        // some user signs in
        async signIn() {

            const user = this.ctx.request.body;

            // user exists
            if (await this.service.users.exists(user.id)) {
                const password = await this.service.users.passwordRight(user.id, user.password);
                if (!password) {
                    this.response(400, 'password error');
                    return;
                }

                this.ctx.redirect('/public/users.html');
            }

            this.response(400, `user doesn't exist`);
        }


        // add a new user
        async addUser() {

            //  ............  authority judge


            const user = this.ctx.request.body;

            // user exists
            if (!await this.service.users.insert(user)) {
                this.response(403, 'user exists');
                return;
            }

            this.response(203, 'add user successed');
        }


        // delete some user whoes level less than oprated man
        async deleteUser() {

            //  ...........  authority judge


            const user = this.ctx.request.body;
            if (!await this.service.users.delete(user)) {
                this.response(404, `user doesn't exist`);
                return;
            }

            this.response(204, 'delete user successed');
        }
    }

    return User;
}