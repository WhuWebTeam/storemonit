

module.exports = (options, app) => {

    return async function uppercase(ctx, next) {
        ctx.query.name = ctx.query.name && ctx.query.name.toUpperCase();
        await next();
    }
}