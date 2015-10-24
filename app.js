var Controller = {
	save: function(req, res) {
		model.save(function(err, data) {
			if (err) {
				console.log('Erro', err);
				msg = 'Erro' + err;
			}
			console.log('Cerveja Inserida', data);
			msg = 'Cerveja Inserida' + data;
		});
		res.end(msg);
	}
}

var http = require('http');

// Bring Mongoose into the app
var mongoose = require('mongoose');

// Build the connection string
mongoose.connect('mongodb://localhost/pos-unoesc');

var db = mongoose.connection;

// When successfully connected
db.on('connected', function() {
	console.log('Mongoose default connection open to ');
});

// If the connection throws an error
db.on('error', function(err) {
	console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function() {
	console.log('Mongoose default connection disconnected');
});

// When the connection is disconnected
db.on('open', function() {
	console.log('Mongoose default connection is open');
});

var Schema = mongoose.Schema;

var json_schema = {
	name: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	alcohol: {
		type: Number,
		min: 0
	},
	price: {
		type: Number,
		min: 0
	},
	category: {
		type: String,
		default: ''
	}
}

var BeerSchema = new Schema(json_schema);

var Beer = mongoose.model('Beer', BeerSchema);

var msg = '';

http.createServer(function(req, res) {

	var url = req.url;

	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	var dados = {
		name: 'Skol',
		description: 'Desce redondo',
		alcohol: 10,
		price: 12,
		category: 'pilsen'
	};
	var model = new Beer(dados);

	/*
		model.save(function(err, data) {
			if (err) {
				console.log('Erro', err);
				msg = 'Erro' + err;
			}
			console.log('Cerveja Inserida', data);
			msg = 'Cerveja Inserida' + data;
		});
		res.end(msg);*/


	switch (url) {
		case '/api/beers/create':
			Controller.create(req, res);
			break;
		case '/api/beers/save':
			Controller.save(req, res);
			break;
		case '/api/beers/retrieve':
			Controller.update(req, res);
			break;
		case '/api/beers/delete':
			Controller.delete(req, res);
			break;
		default:
			res.end('erro url', url);
	}

}).listen(3000);
console.log('Server running at http://localhost:3000/');