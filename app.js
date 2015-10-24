var Controller = {
  create: function(req, res) {
  var dados = {
      name: 'Skol',
      description: 'desce redondo',
      alcohol: 24,
      price: 30,
      category: 'pilsen'
    };

    var model = new Model(dados);
    var msg = '';

    model.save(function (err, data) {
      if(err) {
        console.log("Erro: ", err);
        msg = "Erro: " + err;
      } else {
        console.log("Cerveja inserida.", data);
        msg = "Cerveja inserida. " + data;
      }
      res.end(msg);
    });
  },
  retrieve: function(req, res) {
    var query = {};
    Model.find(query, function(err, data) {
      if(err) {
        console.log("Erro: ", err);
        msg = "Erro: " + err;
      } else {
        console.log("listagem: ", data);
        msg = "Listagem: " + data;
      }
      res.end(msg);
    });
  },
  update: function(req, res) {
    var query = {name: /Skol/i};
    var mod = {
      name: 'Brahma',
      alcohol: 12,
      price: 130,
      category: 'pilsen'
    };
    Model.update(query, mod, function(err, data) {
      if(err) {
        console.log("Erro: ", err);
        msg = "Erro: " + err;
      } else {
        console.log("Cervejas atualizadas: ", data);
        msg = "Cervejas atualizadas: " + data;
      }
      res.end(msg);
    });
  },
  delete: function(req, res) {
    var query = {name: /Skol/i};
    Model.remove(query, function(err, data) {
      if(err) {
        console.log("Erro: ", err);
        msg = "Erro: " + err;
      } else {
        console.log("Cerveja deletadas, quantidade: ", data.result);
        msg = "Cerveja deletadas, quantidade: " + data.result;
      }
      res.end(msg);
    });
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
