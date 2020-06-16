'use strict';
module.exports = function(app) {
  var express = require('express');
  var backend = require('../controllers/backendController');

  // Registers Routes
  app.route('/entrenaModelo').get(backend.entrena);
  app.route('/allData').get(backend.list_all);
  app.route('/borrarAllData').delete(backend.deleteAllNoticias);
  app.route('/estimacion').post(backend.estimacion);
  app.route('/allNubePuntos').post(backend.list_all_nube);

};
