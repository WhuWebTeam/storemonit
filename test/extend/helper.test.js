const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test app/extend/helper.js', () => {

    describe('demo()', () => {

        // test pass true to helper's demo method
        it('should return true when pass true to demo method of helper', () => {
            const ctx = app.mockContext();
            assert.strictEqual(ctx.helper.demo(true), true, 'demo should return true when pass true to it');
        });

        // test pass false to helper's demo method
        it('should return false when pass false to demo method of helper', () => {
            const ctx = app.mockContext();
            assert.strictEqual(ctx.helper.demo(false), false, 'demo should return false when pass false to it');
        });
    });
});