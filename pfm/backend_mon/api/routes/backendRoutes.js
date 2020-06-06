'use strict';
module.exports = function(app) {
  var express = require('express');
  var backend = require('../controllers/backendController');
  var backendUsers = require('../controllers/backendUsersController');
  var backendCartera = require('../controllers/backendCarteraController');
  var backendNoticias = require('../controllers/backendNoticiasController');

  // Registers Routes
  app.route('/registros').get(backend.list_all_registros);
  app.route('/nuevoRegistro').post(backend.add_registro);
  app.route('/borraRegistro/:registroId').delete(backend.deleteregistro);
  app.route('/borraTodosRegistros').delete(backend.deleteAll);
  app.route('/updateDb').get(backend.updateDb);
  app.route('/updateDb').get(backend.updateDb);
  app.route('/buscarFecha/:fecha_inicio/:fecha_fin').post(backend.buscarPorFecha);
  app.route('/buscarPorFechaFiltrando').post(backend.buscarPorFechaFiltrando);
  app.route('/convertirMonedas/:divisaOrigen/:divisaDestino/:cantidad').post(backend.convertirMonedas);
  app.route('/convertirEuros/:divisaOrigen/:cantidad').post(backend.convertirEuros);
  app.route('/getMetricasGlobales').get(backend.getMetricasGlobales);
  app.route('/getLatestBlockData').get(backend.getLatestBlockData);
  app.route('/getStats').get(backend.getStats);

  // Users Routes
  app.route('/nuevoUsuario').post(backendUsers.nuevoUsuario);
  app.route('/login').post(backendUsers.login);
  app.route('/borraUsuario/:usuarioId').delete(backendUsers.borraUsuario);
  app.route('/usuarios').get(backendUsers.list_all_users);
  app.route('/borraTodosUsuarios').delete(backendUsers.deleteAllUsers);
  app.route('/reset/:token').post(backendUsers.resetToken);
  app.route('/forgot').post(backendUsers.postForgot);

  // Cartera Routes
  app.route('/addToCartera').post(backendCartera.addToCartera);
  app.route('/cartera').get(backendCartera.list_all_cartera);
  app.route('/borraTodaCartera').delete(backendCartera.deleteAllCartera);
  app.route('/getCartera').post(backendCartera.getCartera);
  
  // Noticias Routes
  app.route('/getLatestNews').get(backendNoticias.getNoticias);
  app.route('/updateNews').get(backendNoticias.updateNoticias);
  app.route('/borrarTodasLasNoticias').delete(backendNoticias.deleteAllNoticias);
  app.route('/createDailyNewsletter').get(backendNoticias.createDailyNewsletter);

};
