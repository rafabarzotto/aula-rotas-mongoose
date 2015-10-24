// Bring Mongoose into the app
var mongoose = require('mongoose');

// Build the connection string
mongoose.connect('mongodb://localhost/pos-unoesc');

var db = mongoose.connection;

// When successfully connected
db.on('connected', function() {
	console.log('Mongoose Conectado! ');
});

// If the connection throws an error
db.on('error', function(err) {
	console.log('Mongoose ERRO: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function() {
	console.log('Mongoose disconectado!');
});

// When the connection is disconnected
db.on('open', function() {
	console.log('Mongoose conexão aberta!');
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

var Beer = mongoose.model('Beer', BeerSchema),
	query = {
		name: /skol/i
	};

var mod = {
	name: 'Brahma',
	alcohol: 0.5,
	price: 5,
	category: 'pilsen'
};

var optional = {
	update: false,
	multi: false
};

Beer.update(query, mod, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log('Cervejas Atualizadas: ', data);
	}
	// Finalizar node
	process.exit(0);
})