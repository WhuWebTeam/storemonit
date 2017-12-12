module.exports = app => {
    // wuMartUsers controller test
    app.get('/api/v1/userswm/index', 'userswm.index');

    app.post('/api/v1/userswm/login', 'userswm.signIn'); // user sign in
}



// app.post('/api/v1/userswm/login', 'userswm.signIn'); // user sign in
// {
//     id,
//     password
// }