module.exports = app => {

	// home page
	app.redirect('/', '/public/home3.html', 302);

	// wm redirect home page
	app.get('/api/v1/wmHomePage/:userId', 'index.wmHome');

	// clear database
	app.delete('/database', 'index.clear');
}