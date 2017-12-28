

module.exports = app => {
    
    async function uppercase(ctx, next) {
        ctx.query.name = ctx.query.name && ctx.query.name.toUpperCase();
        await next();
    }

    return uppercase;
}