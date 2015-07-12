GLOBAL.I = GLOBAL.I || (function () {
	var project = 'Indosemesta';
	var dir = __dirname + '/';

	return {
		Project : project,
		Dir : dir,
		R : require('rethinkdb'),
		File : __filename.replace(dir, ''),
		Argv : process.argv,
		IP : process.env.IP || '127.0.0.1',
		PORT : process.env.PORT || '8080',
		PID : process.pid,
		Express : require('express'),
		FS : require('fs'),
		Path : require('path'),
		Http : require('http'),
		Favicon : require('serve-favicon'),
		Logger : require('morgan'),
		CookieParser : require('cookie-parser'),
		BodyParser : require('body-parser'),
		Debug : require('debug')(project + ':server')
	}
})();

I.R.connect(require('./config/rethinkdb').core, function(err, conn) {
	if (err) {
		I.Debug(err);
		throw err;
	} else {
		require('./classes/app');
		require('./classes/server');
	}
});