const isJSON = require('koa-is-json');
const zlib = require('zlib');

/**
 * Compress response body when body size grater then setting value
 * @module gzip
 * @since 1.0.0
 */
module.exports = (options, app) => {

    return async (ctx, next) => {
        await next();

        // body doesn't satisfied condition
        let body = ctx.body;
        if (!body) return;
        if (!options.zipSize || options.zipSize && options.zipSize > ctx.length) return;

        // compress response body
        if (isJSON(body)) body = JSON.stringify(body);
        const stream = zlib.createGzip();
        stream.end(body);
        ctx.body = stream;
        ctx.set('Content-Encoding', 'gzip');
    }
}