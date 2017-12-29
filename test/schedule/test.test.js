const { app, assert } = require('egg-mock/bootstrap');

describe('test app/schedule/demo.js', () => {

    describe('async task()', () => {
        
        // first request demo schedule
        it('should add current timestamp as now attribute to app', async () => {
            app.runSchedule('demo');
            assert.strictEqual(app.now, Date.parse(new Date()), `app's now attribute should equal to current timestamp`);;
        });

        // second request demo schedule
        it('should add current timestamp as now attribute to app', async () => {
            app.runSchedule('demo');
            assert.strictEqual(app.now, Date.parse(new Date()), `app's now should equal to current timestamp`);
        });
    });
});