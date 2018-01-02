

module.exports = (options, app) => {
    
    return async function uppercase(ctx, next) {
        this.ctx.query = this.ctx.query.name && this.ctx.query.name.toUpperCase();
        await next();
    }
}