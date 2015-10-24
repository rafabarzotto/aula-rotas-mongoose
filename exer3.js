// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
mongoose.connect('mongodb://localhost/pos-unoesc');

var db = mongoose.connection;

// When successfully connected
db.on('connected', function () {
  console.log('Mongoose default connection open to ');
});

// If the connection throws an error
db.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// When the connection is disconnected
db.on('open', function () {
  console.log('Mongoose default connection is open');
});

var Schema = mongoose.Schema;

var json_schema = {
	name: { type: String, default: ''},
	description: {type: String, default: ''},
	alcohol: {type: Number, min: 0},
	price: {type: Number, min: 0},
	category: {type: String, default: ''}
}

var BeerSchema = new Schema(json_schema);

var Beer = mongoose.model('Beer', BeerSchema);

var dados = {
	name: 'Skol',
	description: 'Desce redondo',
	alcohol: 10,
	price: 12,
	category: 'pilsen'
}

var model = new Beer(dados);

model.save(function(err, data){
	if(err){
		console.log('Erro', err);
	}
	console.log('Cerveja Inserida', data);
});