I.Server = I.Http.createServer(I.App);

I.Server.listen(I.PORT);
I.Server.on('error', function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof I.PORT === 'string'
		? 'Pipe ' + I.PORT
		: 'Port ' + I.PORT;

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
});
I.Server.on('listening', function onListening() {
	var addr = I.Server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	I.Debug('Listening on ' + bind);
});