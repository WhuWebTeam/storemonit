

module.exports = options => {

    async function ctxPrint(ctx, next) {
        console.log(this);
        console.log(this.app);
    }

    return ctxPrint();
}