'use strict';
module.exports = function(app) {
  var express = require('express');
  var jwt = require('jsonwebtoken');
  var backend = require('../controllers/backendController');
  // backend Routes
  app.route('/tasks')
    .get(backend.list_all_tasks)
    .post(backend.create_a_task);


  app.route('/tasks/:taskId')
    .get(backend.read_a_task)
    .put(backend.update_a_task)
    .delete(backend.delete_a_task);

  app.route('/auth').post(backend.auth);
  app.route('/newUser').post(backend.create_user);
  app.route('/listTask').post(backend.list_all_tasks_secure);


};
