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

exports.list_all_tasks_secure = function(req, res) {
  var token = req.body.token;
  if (token) {
    jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
        Task.find({}, function(err, task) {
          if (err)
            res.send(err);
          res.json(task);
        });
      }
    });
  } else {
    res.send({
      mensaje: 'Token no proveída.'
    });
  }

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
  var userData= req.body.username;
  Auth.find({username: userData},function(err, users) {
    if (err) return console.error(err);
    if(users.length ==0){
      res.json({ mensaje: "Usuario sin registrar"});
    }
    if(users.length>=1){
      var usuario = users[0];
      var id_usuario = usuario._id;
      const payload = {
        check:  true
      };
      const tokenData = jwt.sign(payload, config.TOKEN_SECRET, {
        expiresIn: 1440
      });
      Auth.findOneAndUpdate({_id: id_usuario}, {token : tokenData},function(err, users1) {
      });
      res.json({
        mensaje: 'Auth OK',
        token: tokenData
      });
      Auth.find({username: userData},function(err, dataTest) {
        console.log(dataTest[0]);
      });
    }else {
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
  });
};

exports.create_user = function(req, res) {
  var new_user = new Auth(req.body);
  new_user.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

