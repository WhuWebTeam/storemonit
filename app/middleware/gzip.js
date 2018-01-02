const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = (options, app) => {

    return async function(ctx, next) {
        
        await next();

        let body = ctx.body;
        if (!body) return;
        if (options.zipSize && ctx.length < options.zipSzie) return;

        if (isJSON(body)) body = JSON.stringify(body);
        const stream = zlib.createGzip();
        stream.end(body);
        body = stream;
    }
}
