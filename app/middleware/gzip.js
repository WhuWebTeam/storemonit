const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = options => {
    
    function gzip(ctx, next) {
        
        const body = ctx.body;
        if (!body) return;

        if (options.zipLength && ctx.length < options.zipLength) return;

        if (isJSON(body)) body = JSON.stringify(body);

        const stream = zlib.createGzip();
        stream.end(body);
        ctx.body = stream;
        ctx.set('Content-Encoding', 'gzip');
    }

    return gzip;
}