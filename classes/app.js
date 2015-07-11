I.App = I.Express();

I.App.set('port', I.PORT);
I.App.set('views', I.Path.join(I.Dir, 'public/app/views/'));
I.App.set('view engine', 'jade');
I.App.use(I.Logger('dev'));
I.App.use(I.BodyParser.json());
I.App.use(I.BodyParser.urlencoded({ extended: false }));
I.App.use(I.CookieParser());
I.App.use(I.Express.static(I.Path.join(I.Dir, 'public')));

require('./routes');

I.App.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

if (I.App.get('env') === 'development') {
	I.App.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

I.App.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});