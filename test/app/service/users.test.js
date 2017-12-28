const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test app/service/users.js', () => {

    // add a user which doesn't exist
    describe('post /api/v1/users', () => {

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
    });


    // test when user exists
    describe('exists()', () => {

        it('true returned when user exists', async () => {
            const ctx = app.mockContext();
            const exist = await ctx.service.users.exists('10001');
            assert.equal(exist, true, `exists() should return true when user exists`);
        });
    });

    
    // delete user 10001
    describe('delete /api/v1/users/10001', () => {
        
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
    });


    // test when user doesn't exist
    describe('exists()', () => {

        it('false returned when user do not exist', async () => {
            const ctx = app.mockContext();
            const exist = await ctx.service.users.exists('10001');
            assert.equal(exist, false, `exists() should return false when user doesn't exist`);
        });
    });
});