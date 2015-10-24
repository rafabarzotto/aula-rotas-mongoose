// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
mongoose.connect('mongodb://localhost/pos-unoesc');

var db = mongoose.connection;

// When successfully connected
db.on('connected', function () {
  console.log('Mongoose Conectado! ');
});

// If the connection throws an error
db.on('error',function (err) {
  console.log('Mongoose ERRO: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
  console.log('Mongoose disconectado!');
});

// When the connection is disconnected
db.on('open', function () {
  console.log('Mongoose conexão aberta!');
});

var Cat = mongoose.model('Cat', {name: String});

var kitty = new Cat({name: 'Oslvaldinho'});

kitty.save(function(err, data){
	if(err){
		console.log('Erro', err);
	}
	console.log('meow', data);
});