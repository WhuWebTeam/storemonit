

module.exports = app => {
    app.get('/api/v1/counterTypeConf/index', 'counterTypeConf.index');

    app.get('/api/v1/counterTypeConf/info', 'counterTypeConf.getCounterTypeConf');    
}