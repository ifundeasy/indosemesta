I.Router.get('/', function(req, res) {
	res.render('index', { title : I.Project });
});

module.exports = I.Router;