var p = '/!', db = require('rethinkdb');
var account = require(I.Dir + 'config/rethinkdb').data;
var getReq = function (req) {
	var obj = {
		body : req.body,
		query : req.query,
		params : req.params
	};
	console.log(obj);

	return obj;
};

var reading = function (req, res) {
	var obj = getReq(req);
	var name = obj.params.table;
	var where = obj.query;
	db.connect(account, function (err, conn) {
		if (!err) {
			if (Object.keys(where).length) {
				if (where.id) {
					db.table(name).get(where.id).run(conn, function (err, data) {
						res.send([err, data]);
						conn.close();
					});
				} else {
					db.table(name).filter(where).run(conn, function (err, data) {
						var d = data._responses[0] || { r : [] };
						res.send([err, d.r]);
						conn.close();
					});
				}
			} else {
				db.table(name).run(conn, function (err, data) {
					var d = data._responses[0] || { r : [] };
					res.send([err, d]);
					conn.close();
				});
			}
		}
	});
};
var inserting = function (req, res) {
	var obj = getReq(req);
	var name = obj.params.table;
	var data = obj.body;
	db.connect(account, function (err, conn) {
		if (!err) {
			db.table(name).insert(data).run(conn, function (err, data) {
				res.send(arguments);
				conn.close();
			});
		} else {
			res.send([err, []]);
		}
	});
};
var updating = function (req, res) {
	var obj = getReq(req);
	var name = obj.params.table;
	var where = obj.query;
	var data = obj.body;
	db.connect(account, function (err, conn) {
		if (!err) {
			if (Object.keys(where).length) {
				if (where.id) {
					db.table(name).get(where.id).update(data).run(conn, function (err, data) {
						res.send([err, data]);
						conn.close();
					});
				} else {
					db.table(name).filter(where).update(data).run(conn, function (err, data) {
						res.send([err, data]);
						conn.close();
					});
				}
			} else {
				res.send([err, []]);
			}
		}
	});
};
var deleting = function (req, res) {
	var obj = getReq(req);
	var name = obj.params.table;
	var where = obj.query;
	db.connect(account, function (err, conn) {
		if (!err) {
			if (Object.keys(where).length) {
				if (where.id) {
					db.table(name).get(where.id).delete().run(conn, function (err, data) {
						res.send([err, data]);
						conn.close();
					});
				} else {
					db.table(name).filter(where).delete().run(conn, function (err, data) {
						res.send([err, data]);
						conn.close();
					});
				}
			} else {
				res.send([err, []]);
			}
		}
	});
};

I.Router.get(p + '/', function (req, res) {
	db.connect(account, function (err, conn) {
		if (!err) {
			db.tableList().run(conn, function(){
				res.send(arguments);
				conn.close();
			});
		}
	});
});
I.Router.route(p + '/:table')
	.all(function (req, res, next) {
		I.Debug(getReq(req));
		next();
	})
	.post(inserting)
	.get(reading)
	.put(updating)
	.delete(deleting);

module.exports = I.Router;