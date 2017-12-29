// const { app, mock, assert } = require('egg-mock/bootstrap');

// describe('test app/extend/request.js', () => {

//     describe('get requestTime()', () => {

//         it('should return x-request-time', () => {
//             const ctx = app.mockContext({
//                 headers: {
//                     'x-request-time': Date.parse(new Date()),
//                 },
//             });

//             console.log(ctx.request);
//             console.log(ctx.request.get('x-request-time'));
//             // assert.ok(ctx.request.get('x-request-time') <= Date.parse(new Date()), 'x-request-time must be timestamp and less than now timestamp');
//         });
//     });
// });