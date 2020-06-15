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

//Mejorar, no añade sobre el mismo elemento, sino que crea uno nuevo
exports.addToCartera = function(req, res) {
  var data = req.body;
  var token = data.token;
  var user = data.username;
  let rates = data.rates;
  var rates_div = rates.split(":");
  var rate = rates_div[0];
  var cantidad = rates_div[1];
  var data_q={};
  data_q[rate]=cantidad;
  if(token) {
    jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
        const filter = { username: user };
        console.log(filter);
        mongoose.set('useFindAndModify', false);
        Cartera.find(filter,function(err, result) {
          //si no existe devuelve []
          if(result.length==0){
            var data_new={};
            data_new["username"] = user;
            data_new["rates"]=data_q;
            var new_task = new Cartera(data_new);
            new_task.save(function(err, task) {
              if (err){
              res.send(err);
              }  
              res.json(task);
            });
          }else{
            //obtengo todas las divisas del usuario
            var rates_new = result[0].rates;  // aqui tengo lo de DB
            var entrado=false;
            var keys_rates = Object.keys(rates_new);
            for(var i=0;i<=keys_rates.length-1;i++){
              if(keys_rates[i]==rate){
                //cantidad_old no esta referenciado al de la DB -- FALLO A ARREGLAR
                var cantidad_old = result[0].rates[rate];
                var total = parseInt(cantidad_old) + parseInt(cantidad);
                rates_new[keys_rates[i]]=total; 
                entrado = true;
              }else{
                //la moneda no existe, se crea y se actualiza
                if(!keys_rates.includes(rate)){
                rates_new[rate]=parseInt(cantidad);
              }
              }
            }
            const filter = { username: user };
            const update = { rates: rates_new };
            console.log(update);
            Cartera.findOneAndUpdate(filter,update,function(err, respon) {
              if (err)
                res.send(err);
              res.json(respon);
            });
          }
         
        });
}
})
};
};

exports.deleteAllCartera = function(req, res) {
  Cartera.deleteMany({}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'All cartera successfully deleted' });
  });
};

//unificar todos los datos en uno por moneda
exports.getCartera = function(req, res) {
  var data = req.body;
  var token = data.token;
  var user = data.username;
  if(token) {
    jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
  Cartera.find({username:user}, function(_err, registros,response=res) {
    var data_salida={};  
      if(registros.length!=0){
       console.log(registros);
       data_salida = registros[0].rates;
      }
      console.log(data_salida);
       res.send({
            usernameLogin: user,
            rates: data_salida
          });
        });
      }})
    }};
    