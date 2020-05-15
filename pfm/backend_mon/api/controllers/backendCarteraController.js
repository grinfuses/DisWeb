'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('../../config'),
  Usuario = mongoose.model('Usuarios'),
  Cartera = mongoose.model('Cartera');

exports.list_all_cartera = function(req, res) {
  Cartera.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.addToCartera = function(req, res) {
  var data = req.body;
  var token = data.token;
  var user = data.username;
  let rates = data.rates;
  if(token) {
    jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
  Usuario.find({username:user}, function(err, user,response=res) {
      if(user!=undefined){
        var data_new = {};
        data_new.username = user[0].username;
        var res = rates.split(",");
        var result_rates = {};
        for(var i=0;i<=res.length-1;i++){
          var hijo1 = res[i].split(":");
          var id_moneda = hijo1[0];
          var cantidad = hijo1[1];
          // console.log(id_moneda);
          // console.log(cantidad);
          result_rates[id_moneda]=cantidad;
        }
        data_new.rates=result_rates;
        console.log(data_new);
         var new_task = new Cartera(data_new);
         new_task.save(function(err, task) {
           if (err){
           response.send(err);
           }  
           response.json(task);
         });
      
      }
  });  
}})
};
};

exports.deleteAllCartera = function(req, res) {
  Cartera.deleteMany({}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'All cartera successfully deleted' });
  });
};