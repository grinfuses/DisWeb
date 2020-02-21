'use strict';


var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('../../config'),
  Task = mongoose.model('Tasks'),
  Auth = mongoose.model('User');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

exports.auth = function(req, res) {
  var username= req.body.username;
  var password = req.body.password;
  Auth.findById({name: username, password:this.password}, {new: true}, function(err, userFind) {
    console.log(userFind);
  });
  if(req.body.username === "jnaranjo" && req.body.password === "prueba") {
    const payload = {
      check:  true
    };
    const token = jwt.sign(payload, config.TOKEN_SECRET, {
      expiresIn: 1440
    });

    res.json({
      mensaje: 'Auth OK',
      token: token
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos"})
  }

};

exports.create_user = function(req, res) {
  var new_user = new Auth(req.body);
  new_user.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

