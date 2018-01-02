

module.exports = app => {

    const BaseController = require('./baseController')(app);

    class Test extends BaseController {

        async test1() {
            this.response(200, this.app.config);
        }

        async test2() {
            this.response(400, 'get recorde failed');
        }

        async test3() {
            const student = {
                id: '001',
                name: 'xx',
                sex: 'man'
            };
            this.response(200, student);
        }

        async test4() {
            const students = [
                {
                    id: '001',
                    name: 'xx',
                    sex: 'man'
                },
                {
                    id: '002',
                    name: 'jj',
                    sex: 'woman'
                }
            ];
            this.response(200, students);
        }
    }

    return Test;
}