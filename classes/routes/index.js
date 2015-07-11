I.Router = I.Express.Router();

I.Router.use(function timeLog(req, res, next) {
	console.log('Time: ', new Date());
	next();
});

I.App.use('/', require('./page'));
I.App.use('/!', require('./rest'));