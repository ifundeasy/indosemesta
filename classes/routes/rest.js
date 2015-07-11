var p = '/!';

I.Router.get(p + '/', function(req, res) {
	res.send({ data : I.Project });
});
I.Router.get(p + '/about', function(req, res) {
	res.send({
		data : 'About ' + I.Project
	});
});

module.exports = I.Router;