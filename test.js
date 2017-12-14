

shops:
app.get('/api/v1/shops/checker/notAssigned', 'shops.getShopsNotAssainged'); // get shops not assined
app.get('/api/v1/shops/checker/assigned', 'shops.getShopsAssigned'); // get shops assigned

counters:
app.get('/api/v1/counters/checker/assigned', 'counters.getCountersAssigned'); // get info of counters assigned
app.get('/api/v1/counters/checker/notAssaigned', 'counters.getCountersNotAssigned'); // get info of counters not assigned
