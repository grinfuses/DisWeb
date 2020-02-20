'use strict';
module.exports = function(app) {
  var backend = require('../controllers/backendController');

  // todoList Routes
  app.route('/tasks')
    .get(backend.list_all_tasks)
    .post(backend.create_a_task);


  app.route('/tasks/:taskId')
    .get(backend.read_a_task)
    .put(backend.update_a_task)
    .delete(backend.delete_a_task);
};
