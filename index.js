GLOBAL.I = GLOBAL.I || (function () {
	var project = 'Indosemesta';
	var dir = __dirname + '/';
	var obj = {
		Project : project,
		Dir : dir,
		File : __filename.replace(dir, ''),
		Argv : process.argv,
		IP : process.env.IP || '127.0.0.1',
		PORT : process.env.PORT || '8080',
		PID : process.pid,
		Express : require('express'),
		FS : require('fs'),
		Path : require('path'),
		Http : require('http'),
		Util : require('util'),
		Favicon : require('serve-favicon'),
		Logger : require('morgan'),
		CookieParser : require('cookie-parser'),
		BodyParser : require('body-parser'),
		RdbA : require('./config/rethinkdb'),
		Debug : require('debug')(project + ':server')
	};

	return obj
})();

require('./classes/app');
require('./classes/server');