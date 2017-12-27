const { app, mock, assert } = require('egg-mock/bootstrap');
let accessTime;

describe('test app/extend/contest.js', () => {

    describe('get accessTime()', () => {

        // first request context's accessTime
        it('should return the access time, and grater than now timestamp', () => {
            const ctx = app.mockContext();
            accessTime = ctx.accessTime;
            assert.ok(Date.parse(new Date()) <= ctx.accessTime, `context's accessTime must before now timestamp`);
        });

        // second request context's accessTime
        it('should return the access time, and equal to first accesstime stamp', () => {
            const ctx = app.mockContext();
            assert.strictEqual(accessTime, ctx.accessTime, 'first context accesTime should grater than second context accessTime');
        });
    });


    describe('demo()', () => {

        // return true when pass true as parameter to demo
        it('should return true when pass true to demo', () => {
            const ctx = app.mockContext();
            assert.strictEqual(ctx.demo(true), true, 'demo should return true when pass true to it');
        });

        // return false when pass false as parameter to demo
        it('should return false when pass false to demo', () => {
            const ctx = app.mockContext();
            assert.strictEqual(ctx.demo(false), false, 'demo should retun false when pass false to it');
        });
    });
});