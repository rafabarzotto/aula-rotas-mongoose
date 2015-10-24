var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pos-unoesc');

var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Erro de conexao.', err)
});
db.on('open', function() {
  console.log('Conexão aberta.')
});
db.on('connected', function() {
  console.log('Conectado')
});
db.on('disconnected', function() {
  console.log('Desconectado')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
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
});

module.exports = mongoose.model('Beer', BeerSchema);