'use strict';
module.exports = function(app) {
  var express = require('express');
  var backend = require('../controllers/backendController');
  // backend Routes
  app.route('/registros').get(backend.list_all_registros);
  app.route('/nuevoRegistro').post(backend.add_registro);
  app.route('/borraRegistro/:registroId').delete(backend.deleteregistro);
  app.route('/borraTodosRegistros').delete(backend.deleteAll);
  app.route('/updateDb').get(backend.updateDb);
  app.route('/updateDb').get(backend.updateDb);
  app.route('/buscarFecha/:fecha_inicio/:fecha_fin').post(backend.buscarPorFecha);
  app.route('/buscarPorFechaFiltrando/:fecha_inicio/:fecha_fin/:currencies').post(backend.buscarPorFechaFiltrando);
  app.route('/convertirMonedas/:divisaOrigen/:divisaDestino/:cantidad').post(backend.convertirMonedas);
  app.route('/convertirEuros/:divisaOrigen/:cantidad').post(backend.convertirEuros);

};
