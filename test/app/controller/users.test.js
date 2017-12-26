const { app, mock, assert } = require('egg-mock/bootstrap');
const should = require('should');

describe('test app/controller/users.js', () => {

    describe('post /api/v1/users', () => {

        // add a user which doesn't exist
        it('should status 200 and return an object with code 203, and data { info }', async () => {
            app.mockCsrf();
            const response = await app.httpRequest()
            .post('/api/v1/users')
            .type('form')
            .send({
                id: '10001',
                userName: 'xj',
                password: '123',
                authorityId: '',
                phone: '12345678901',
                email: '1234567890@qq.com'
            })
            .expect(200);

            const body = response.body;
            assert.strictEqual(body.code, 203, 'user has been exists');
        });

        // add the user once more test user exists
        it('should status 200 and return an object with code 403, and message string', async () => {
            app.mockCsrf();
            const response = await app.httpRequest()
            .post('/api/v1/users')
            .type('form')
            .send({
                id: '10001',
                userName: 'xj',
                password: '123',
                authorityId: '',
                phone: '12345678901',
                email: '1234567890@qq.com'               
            })
            .expect(200);

            const body = response.body;
            assert.strictEqual(body.code, 403, `user doesn't exists`);
        });
    });


    describe('put /api/v1/users', () => {

        // modify user's info which exists
        it('should status 200 and return an object with code 203, and data { info }', async () => {
            app.mockCsrf();
            const response = await app.httpRequest()
            .put('/api/v1/users')
            .type('form')
            .send({
                id: '10001',
                userName: 'xx'
            })
            .expect(200);
            
            const body = response.body;
            assert.strictEqual(body.code, 203, `user doesn't exists`);
        });

        // modify user's info which doesn't exists
        it('should status 200 and return an object with code 403, and message string', async () => {
            app.mockCsrf();
            const response = await app.httpRequest()
            .put('/api/v1/users')
            .type('form')
            .send({
                id: '10002',
                userName: 'xx'
            })
            .expect(200);

            const body = response.body;
            assert.strictEqual(body.code, 403, `user exists`);
        })
    })


    describe('get /api/v1/users', () => {
        
        it('should status 200 and return an object with code 200, and data [object...]', async () => {
            const response = await app.httpRequest()
            .get('/api/v1/users')
            .expect(200);

            const body = response.body;
            // body.be.an.instanceOf(Object).and.have.property('code', 'data');
            assert.strictEqual(body.code, 200, 'response json data should be 200');
            body.data.should.be.instanceof(Array);
        });
    });


    describe('delete /api/v1/users/10001', () => {
        
        // delete user which exists
        it('should status 200 and return an object with code 204, and object { info }', async () => {
            app.mockCsrf();
            const response = await app.httpRequest()
            .delete('/api/v1/users/10001')
            .type('form')
            .send({
                id: '10001'
            })
            .expect(200);

            const body = response.body;
            assert.strictEqual(body.code, 204, `user doesn't exist`);
        });

        
        // delete user which doesn't exists
        it('should status 200 and return an object with code 404, and object message', async () => {
            app.mockCsrf();
            const response = await app.httpRequest()
            .delete('/api/v1/users/10001')
            .type('form')
            .send({
                id: '10001'
            })
            .expect(200);

            const body = response.body;
            assert.strictEqual(body.code, 404, `user exists`);
        })
    })
});