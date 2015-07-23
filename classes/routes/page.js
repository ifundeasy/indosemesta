I.Router.get('/', function(req, res) {
	res.redirect('/index');
});
I.Router.get('/index', function(req, res) {
	res.render('index', { title : I.Project });
});
I.Router.get('/cpanel', function(req, res) {
	res.render('cpanel', { title : I.Project });
});
I.Router.get('/login', function(req, res) {
	res.render('login', { title : I.Project });
});

module.exports = I.Router;