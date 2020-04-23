'use strict';
const _ = require('lodash');
const bcrypt=require('bcryptjs');

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('../../config'),
  Usuario = mongoose.model('Usuarios');

exports.list_all_users = function(req, res) {
  Usuario.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.updateDb = function(req, res) {
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'http://api.coinlayer.com/live?access_key=00157dd1a2a6c6267a87c5aedcfecdba&target=EUR',
    'headers': {
    }
  };
  
  var data = request(options, function (error, response) { 
    if (error) throw new Error(error);
    var data= JSON.parse(response.body);
    var date = new Date(data.timestamp * 1000);
    data.timestamp = date;
    delete data['success'];
    delete data['terms'];
    delete data['privacy'];
    console.log(data);
    var new_task = new Registros(data);
    new_task.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  });
  
};

exports.updateDbCron = function() {
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'http://api.coinlayer.com/live?access_key=00157dd1a2a6c6267a87c5aedcfecdba&target=EUR',
    'headers': {
    }
  };
  
  var data = request(options, function (error, response) { 
    if (error) throw new Error(error);
    var data= JSON.parse(response.body);
    var date = new Date(data.timestamp * 1000);
    data.timestamp = date;
    delete data['success'];
    delete data['terms'];
    delete data['privacy'];
    console.log(data);
    var new_task = new Registros(data);
    new_task.save(function(err, task) {
      if (err)
        console.log("Error updating db");
      console.log(task);
    });
  });
  
};

exports.add_registro = function(req, res) {
  var data = req.body;
  var date = new Date(data.timestamp * 1000);
  data.timestamp = date;
  var rates = data.rates;
  var mydatas= JSON.parse(rates);
  data.rates=mydatas;
  console.log(data);

  var new_task = new Registros(data);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_registro = function(req, res) {
  //
};

exports.buscarPorFecha = function(req, res) {
  var fecha_desde = req.params.fecha_inicio;
  var fecha_hasta = req.params.fecha_fin;
  Registros.find({timestamp:{
    $gte: fecha_desde,
    $lte: fecha_hasta
  }}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.buscarPorFechaFiltrando = function(req, res) {
  var fecha_desde = req.params.fecha_inicio;
  var fecha_hasta = req.params.fecha_fin;
  var currency = req.params.currencies;
  //console.log(currency);
  // console.log(fecha_hasta);
  // console.log(fecha_desde);

  Registros.find({timestamp:{
    $gte: fecha_desde,
    $lte: fecha_hasta
  }}, function(err, tasks) {
    var data = JSON.stringify(tasks);
    var data_json = JSON.parse(data);
    var keys = Object.keys(data_json);
    let response = {};
    var data1 =JSON.parse(response)
    keys.forEach(element => {
     //console.log(element);
      var data_child = {};
      //console.log(data_json[element]);
      //console.log(data_json[element]._id);
      data_child._id=data_json[element]._id;
      data_child.timestamp =data_json[element].timestamp;
      data1.push(JSON.parse(data_child));
    }); 
    //Falta añadir data_child a response 
    console.log(data1);
  });
};

exports.convertirMonedas = function(req, res) {
  var divisaOrigen = req.params.divisaOrigen;
  var divisaDestino = req.params.divisaDestino;
  var cantidad = req.params.cantidad;

  Registros.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, task) {
    console.log(task);
    var keys = Object.keys(task.rates);
    let cot_divisa_destino=0;
    let cot_divisa_origen=0;
    //Get the currency of last inputs of rates
    keys.forEach(element => {
      if(element == divisaDestino){
          cot_divisa_destino = task.rates[divisaDestino];
        }
    }); 
    keys.forEach(element => {
      if(element == divisaOrigen){
        cot_divisa_origen = task.rates[divisaOrigen];
        }
    }); 
      //maths 
    var total_origen = cantidad * cot_divisa_origen;
    var total_destino = total_origen/cot_divisa_destino;
    var data = {};
    data.divisaOrigen=divisaOrigen;
    data.divisaDestino=divisaDestino;
    data.cantidad = cantidad;
    data.conversion= total_destino;
    res.json(data);
    });
};

exports.convertirEuros = function(req, res) {
  var divisaOrigen = req.params.divisaOrigen;
  var cantidad = req.params.cantidad;

  Registros.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, task) {
    console.log(task);
    var keys = Object.keys(task.rates);
    let cot_divisa_destino=0;
    let cot_divisa_origen=0;
    keys.forEach(element => {
      if(element == divisaOrigen){
        cot_divisa_origen = task.rates[divisaOrigen];
        }
    }); 
      //maths 
    var total_origen = cantidad * cot_divisa_origen;
    var data = {};
    data.divisaOrigen=divisaOrigen;
    data.divisaDestino="EUR";
    data.cantidad = cantidad;
    data.conversion= total_origen;
    res.json(data);
    });
};


exports.deleteregistro = function(req, res) {
  Registros.deleteOne({
    _id: req.params.registroId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Register successfully deleted'});
  });
};

exports.deleteAllUsers = function(req, res) {
  Usuario.deleteMany({}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'All users successfully deleted' });
  });
};

//Usuario
exports.nuevoUsuario = function(req, res) {
  var data = req.body;
  const saltRounds = 10;
  const data_hashed = {};
  const salt =  bcrypt.genSaltSync(saltRounds);
  const hash_password =  bcrypt.hashSync(data.password, salt);
  data_hashed.name = data.name;
  data_hashed.surname = data.surname;
  data_hashed.username = data.username;
  data_hashed.email = data.email;
  data_hashed.password = hash_password;
  var new_user = new Usuario(data_hashed);
  new_user.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
  
};

exports.borraUsuario = function(req, res) {
  console.log(req);
};

exports.login = function(req, res) {
  var data = req.body;
  const saltRounds = 10;
  const salt =  bcrypt.genSaltSync(saltRounds);
  console.log(data);
  async function login() {
    const user = await Usuario.findOne({ username: data.username },function(err, result) {
     if(result==null){
      res.send({
        message: "Login fail username incorrect"
      });
     }
        
    });
    console.log(user.password);
    await bcrypt
      .compare(data.password, user.password)
      .then(loginData => {
        if (loginData) {
          console.log(loginData);
          let token = jwt.sign({ email: user.email }, "firma_token", {
            expiresIn: "3d"
          });
          console.log(token);
          console.log(user.email);
          res.send({
            token: token,
            name: user.name,
            surname: user.surname,
            email: user.email
          });
        } else {
          console.log("Error during login");
          res.send({
            message: "Login fail password incorrect"
          });
        }
      });
  }
  login();
};