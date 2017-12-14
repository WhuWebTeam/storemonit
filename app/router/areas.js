module.exports = app => {
    // app.controller.areas test
    app.get('/api/v1/areas/index', 'areas.index');

    app.get('/api/v1/areas/info/areas', 'areas.getAreas'); // get all areas' info
    app.put('/api/v1/areas/info/:areaId', 'areas.modifyArea'); // modify info of some area specified by area id
    app.post('/api/v1/areas/info/:areaId', 'areas.addArea'); // add a new area info
    app.delete('/api/v1/areas', 'areas.removeAreas'); // remove areas specified by id
}


// app.put('/api/v1/areas/:areaId', 'areas.modifyAreaById'); // modify info of some area specified by area id
// subset of area, means name and details can exists or not
// :areaId serial number of area
// {
//     name,
//     details
// }



// app.post('/api/v1/areas', 'areas.addArea'); // add a new area info
// attributes belongs to the following object, id must exists
// :areaName name of area
// {
//     id,
//     name,
//     details
// }



// app.delete('/api/v1/areas', 'areas.removeAreas'); // remove areas specified by id
// {
//     areas:
//     [
//         { id },
//         { id }
//     ]
// }