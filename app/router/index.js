module.exports = app => {

	// home page
	app.redirect('/', '/public/home3.html', 302);

	// wm supermarket api checker
	app.get('/api/v1/wmHomePage/1', 'index.checker');  // ?userid:=string&name:=string&shopid:=string&token:=string

	// wm supermarket api manager
	app.get('/api/v1/wmHomePage/2', 'index.manager'); // ?userid:=string&name:=string&shopid:=string&token:=string

	// wm supermarket api chief
	app.get('/api/v1/wmHomePage/3', 'index.chief');   // ?userid:=string&name:=string&shopid:=string&token:=string

	// clear database
	app.delete('/database', 'index.clear');
}