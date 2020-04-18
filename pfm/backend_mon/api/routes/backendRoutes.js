'use strict';
module.exports = function(app) {
  var express = require('express');
  var backend = require('../controllers/backendController');
  // backend Routes
  app.route('/registros').get(backend.list_all_registros);
  app.route('/nuevoRegistro').post(backend.add_registro);
  app.route('/borraRegistro/:registroId').delete(backend.deleteregistro);
  app.route('/updateDb').get(backend.updateDb);
};
