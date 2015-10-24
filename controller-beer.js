var Beer = require('model-beer');

module.exports = {
  create: function(req, res) {

    var msg = '',
      dados = {
        name: 'Budweiser',
        description: 'Até que vai',
        alcohol: 5.0,
        price: 3.5,
        category: 'lager'
      };

    var model = new Beer(dados);

    model.save(function(err, data) {
      if (err) {
        console.log('Erro', err);
      }
      console.log('Cerveja Inserida', data);
    });

  },

  retrieve: function(req, res) {
    var msg = '';
    Beer.find({}, function(err, data) {
      if (err) {
        console.log('Erro: ', err);
        msg = 'Erro: ' + err;
      } else {
        console.log('Listagem: ', data);
        msg = 'Cervejas: ' + JSON.stringify(data);
      }
      res.end(msg);
    });

  },

  update: function(req, res) {
    var query = {
        name: 'Skoll'
      },
      msg = '',
      mod = {
        alcohol: 99
      },
      optional = {
        upsert: false,
        multi: true
      };

    Beer.find(query, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Listagem', data);
      }
    });

  },

  delete: function(req, res) {
    var query = {
        name: 'Brahma'
      },
      msg = '';

    Beer.remove(query, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Cerveja deletada com sucesso, quatidade ', data)
      }
    });

  }

};