module.exports = app => {
    // app.controller.shops' index test
    app.get('/api/v1/shops/index', 'shops.index');

    app.get('/api/v1/shops/manager/:userId', 'shops.getMyShops'); // get district manager's shops
    app.get('/api/v1/shops/notAssigned', 'shops.getShopsNotAssainged'); // get shops not assined
    app.get('/api/v1/shops/assigned', 'shops.getShopsAssigned'); // get shops assigned
    app.get('/api/v1/shops/info/shops', 'shops.getShops'); // get all shops info
    app.put('/api/v1/shops/info/:shopId', 'shops.modifyShop'); // modify some shop's info
    app.post('/api/v1/shops/info/:shopId', 'shops.addShop'); // add a new shop
    app.delete('/api/v1/shops', 'shops.deleteShops'); // delete shops specified by shop id
}


// app.put('/api/v1/shops', 'shops.modifyShop'); // modify some shop's info
// attributes belongs to the following object
// {
//     areaId,
//     name,
//     details,
//     type
// }



// app.post('/api/v1/shops', 'shops.addShop'); // add a new shop
// attributes belongs to the following object
// {
//     areaId,
//     name,
//     details,
//     type
// }




// app.delete('/api/v1/shops', 'shops.deleteShops'); // delete shops specified by shop id
// {
//     shops: 
//     [
//         { id },
//         { id }
//     ]
// }