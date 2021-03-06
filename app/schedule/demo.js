

module.exports = app => {
    return {
        schedule: {
            interval: '1s',
            type: 'all',
            immediate: true,
            disable: app.config.env === 'server' || app.config.env === 'local'
        },

        async task() {
            app.now = Date.parse(new Date());
        }
    }
}