

module.exports = app => {

    // controller.counters test
    app.get('/api/v1/counters/index', 'counters.index');

    app.get('/api/v1/counters/myCounter/:userId', 'counters.getMyCounter'); // get counters' info assigned to some user
    app.get('/api/v1/counters/checker/assigned', 'counters.getCountersAssigned'); // get info of counters assigned
    app.get('/api/v1/counters/checker/notAssaigned', 'counters.getCountersNotAssigned'); // get info of counters not assigned
    app.get('/api/v1/counters/shop/:shopId', 'counters.getCounterByShopId'); // get counters' info by shop id
    app.put('/api/v1/counters/info/:counterId', 'counters.modifyCounter'); // modify info of some counter specified by id
    app.post('/api/v1/counters/info/:counterId', 'counters.addCounter'); // add a new counter
    app.delete('/api/v1/counters', 'counters.deleteCounters'); // delete counters specified by counter ids
}



// app.put('/api/v1/counters/:counterId', 'counters.modifyCounter'); // modify info of some counter specified by id
// :counterId counter's serial number
// {
//     shopId,
//     type,
//     details
// }



// app.post('/api/v1/counters', 'counters.addCounter'); // add a new counter
// attributes belongs to the following object, id must exists
// {
//     shopId,
//     type,
//     details
// }
