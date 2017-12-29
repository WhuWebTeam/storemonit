const { app, assert } = require('egg-mock/bootstrap');
let startTime;

describe('test app/extend/application.js', () => {

    describe('get startTime()', () => {

        // get application's startTime at the first time
        it('statTime should before now timestamp', () => {
            startTime = app.startTime;
            assert.ok(app.startTime >= (Date.parse(new Date())), 'system start time must be a timestamp before');
        });

        // get application's startTime at the second time
        it('startTime should be stable at any time during system running', () => {
            assert.ok(app.startTime >= Date.parse(new Date()), 'system start time must be a timestamp before');
            assert.equal(startTime, app.startTime, 'system startTime must equal stable at any time during system running');
        });
    });


    describe('demo()', () => {

        it('should return true', () => {
            assert.strictEqual(app.demo(true), true, 'extend application method demo should return parameter of the function');
            assert.strictEqual(app.demo(false), false, 'extend application method demo should return parameter of the function');
        });
    });
});