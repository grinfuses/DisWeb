'use strict';
module.exports = function(app) {
  var express = require('express');
  var backend = require('../controllers/backendController');

  // Registers Routes
  app.route('/entrenaModelo').get(backend.entrena);

};
