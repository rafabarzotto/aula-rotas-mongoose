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
