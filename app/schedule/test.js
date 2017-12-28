

module.exports = app => {
    return {
        schedule: {
            interval: '1s',
            type: 'all',
            immediate: true,
            disable: app.config.env === 'server'
        },

        async task() {
            console.log('scedule demo');
        }
    }
}