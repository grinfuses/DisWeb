'use strict';
const _ = require('lodash');
const fs = require('fs');
const brain = require('brain.js');
const assert = require('assert');
var parse = require('csv-parse');
var async = require('async');
var csv = require('csv-string');

const { hasData } = require('jquery');
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('../../config'),
  Registros = mongoose.model('Registros');

exports.list_all_registros = function(req, res) {
  Registros.find({}, function(err, task) {
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
    data.currency="EUR";
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
  var fecha_desde = req.body.fecha_inicio;
  var fecha_hasta = req.body.fecha_fin;
  var rates = req.body.currencies;
  Registros.find({timestamp:{
    $gte: fecha_desde,
    $lte: fecha_hasta
  }
}, function(err, tasks) {
    var data = JSON.stringify(tasks);
    var data_json = JSON.parse(data);
    var keys = Object.keys(data_json);
    var result=[];
    for(var i=0;i<=keys.length-1;i++){
      var sub_json = data_json[i];
      var hijo={};
      hijo._id=sub_json._id;
      hijo.timestamp=sub_json.timestamp;
      hijo.currency=sub_json.currency;
      var keys_rates = Object.keys(sub_json.rates);
      var array_input_rates = rates.split(',');
      hijo.rates=[];
      for(var j=0;j<=keys_rates.length-1;j++){
        for(var k=0; k<=array_input_rates.length-1;k++){
            if(keys_rates[j].localeCompare(array_input_rates[k])==0){
              var value_rate=sub_json.rates[keys_rates[j]];
              var name_rate = keys_rates[j];
              var sub_rate={};
              sub_rate[name_rate]=value_rate;
              hijo.rates.push(sub_rate);
            }
        }
      }
      console.log(hijo);
      result.push(hijo);
    }
    res.json(result);
  }).sort({_id: -1})
  .limit(10);
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

exports.deleteAll = function(req, res) {
  Registros.deleteMany({}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'All registers successfully deleted' });
  });
};

exports.getMetricasGlobales = function(req, res) {
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?convert=EUR',
    'headers': {
      'X-CMC_PRO_API_KEY': '784ab1cc-c8e3-4fb3-84e6-67be0c77a2f6',
      'Cookie': '__cfduid=d641c82dd4ad973c89493688532d38bd11591220278'
    }
  };
  request(options, function (error, response) { 
    if (error){
      throw new Error(error)
    }
    var data= JSON.parse(response.body);
    console.log(data);
    console.log(data.data.quote);
    res.json(data);
  });
  
};

exports.getLatestBlockData = function(req, res) {
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://blockchain.info/latestblock',
  };
  request(options, function (error, response) { 
    if (error){
      throw new Error(error)
    }
    var data= JSON.parse(response.body);
    var hash_last=data.hash;
    var url_data = "https://blockchain.info/rawblock/"+hash_last;
    var options = {
      'method': 'GET',
      'url': url_data,
    };
    request(options, function (error, response) { 
      if (error){
        throw new Error(error)
      }
      var data= JSON.parse(response.body);
      delete data['tx'];
      console.log(data);
      res.json(data);
    });
  });
  
};

exports.getStats = function(req, res) {
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://api.blockchain.info/stats',
  };
  request(options, function (error, response) { 
    if (error){
      throw new Error(error)
    }
    var data= JSON.parse(response.body);
    res.json(data);
    
  });
  
};

exports.estimar = function(req, res) {
  var rates = req.body.currency;
  Registros.find({}
, async function(err, tasks) {
    var data = JSON.stringify(tasks);
    var data_json = JSON.parse(data);
    var keys = Object.keys(data_json);
    var result=[];
    var index_result=0;
    for(var i=0;i<=keys.length-1;i++){
      var sub_json = data_json[i];
      var hijo={};
      var keys_rates = Object.keys(sub_json.rates);
      var array_input_rates = rates.split(',');
      hijo.rates=[];
      for(var j=0;j<=keys_rates.length-1;j++){
        for(var k=0; k<=array_input_rates.length-1;k++){
            if(keys_rates[j].localeCompare(array_input_rates[k])==0){
              var value_rate=sub_json.rates[keys_rates[j]];
              result[index_result]=parseFloat(value_rate);  
              index_result +=1;
            }
        }
      }
      //console.log(result);
            

    }
    
// // provide optional config object, defaults shown.

// const net = new brain.NeuralNetwork();
// net.train([
//   { input: { precio:1000 }, output: { compra: 1 } },
//   { input: { precio:2000 }, output: { compra: 1 } },
//   { input: { precio:3000 }, output: { compra: 1 } },
//   { input: { precio:8000 }, output: { compra: 1 } },
//   { input: { precio:9000 }, output: { venta: 1 } },
//   { input: { precio:20000 }, output: { venta: 1 } },
//   { input: { precio:121000 }, output: { venta: 1 } },
// ]);
// var ultimo_dato = result[0];
// const output = net.run({ precio:ultimo_dato });
// var data_enviar={};
// data_enviar["ultimo_valor"]=ultimo_dato;
// data_enviar["evaluacion"]=output;
var inputFile='BTC-EUR.csv';
    // read contents of the file
    const entrada_texto = fs.readFileSync(inputFile, 'UTF-8');
    // split the contents by new line
    const lines = entrada_texto.split(/\r?\n/);
    // print all lines
    var index=0;
    var cotizaciones_pasadas=[];
    var volumen_mercado =[];
    var apertura =[];
    var highVal=[];
    var lowVal =[];
    var j=0;
    lines.forEach((line) => {
        //console.log(line);
        if(index!=0){
        var datos = line.split(',');
        if(datos[6] !=undefined){
          cotizaciones_pasadas[j] =parseFloat(datos[5]);
          volumen_mercado[j]=parseFloat(datos[6]);
          apertura[j]=parseFloat(datos[1]);
          highVal[j]=parseFloat(datos[2]);
          lowVal[j]=parseFloat(datos[3]);
          j +=1;
          }
        }
        index +=1;
    });
    var data_test_input =[];
    var trainingData =[];
    var traingDataEstimacion =[];
    for (var j=0;j<=cotizaciones_pasadas.length-1;j++){
      var data_fila={};
      var index_volumen = j-1;
      var cot_pas=cotizaciones_pasadas[j];
      var volum_dia =volumen_mercado[j];
      trainingData[j]=Math.round(cot_pas);
      traingDataEstimacion[j]=[Math.round(apertura[j]),Math.round(highVal[j]),Math.round(lowVal[j]),Math.round(cotizaciones_pasadas[j]),Math.round(volumen_mercado[j])]
      if(j==0){
        index_volumen =0;
      }
      var accion_realizada;
      var string_accion;
      var volum_anterior = volumen_mercado[index_volumen];
      //si ese dia ha habido mas volumen de mercado que el anterior, ha habido mas VENTAS =1
      if(volum_anterior <volum_dia){
        accion_realizada=1;
        string_accion ="venta";
      }else{
        accion_realizada=1;
        string_accion ="compra";
      }
      data_fila["input"] = {cotizacion:cot_pas};
      var object = {};
      object[string_accion] = 1;
      data_fila["output"] = object;
      data_test_input[j]=data_fila;
    }
    const net = new brain.NeuralNetwork();
    var trainingData1=[];
    var index_max =trainingData.length/12;
    net.train(data_test_input);
    var ultimo_dato = result[0];
    const output = net.run({cotizacion:ultimo_dato}); 
    var data_enviar={};
    data_enviar["ultimo_valor"]=ultimo_dato;
    data_enviar["evaluacion"]=output;
res.json(data_enviar);  
}).sort({_id: -1}).limit(1);
};

exports.sandbox = function(req, res) {
  var rates = "BTC";
  Registros.find({}
, async function(err, tasks) {
    var data = JSON.stringify(tasks);
    var data_json = JSON.parse(data);
    var keys = Object.keys(data_json);
    var result=[];
    var index_result=0;
    for(var i=0;i<=keys.length-1;i++){
      var sub_json = data_json[i];
      var hijo={};
      var keys_rates = Object.keys(sub_json.rates);
      var array_input_rates = rates.split(',');
      hijo.rates=[];
      for(var j=0;j<=keys_rates.length-1;j++){
        for(var k=0; k<=array_input_rates.length-1;k++){
            if(keys_rates[j].localeCompare(array_input_rates[k])==0){
              var value_rate=sub_json.rates[keys_rates[j]];
              result[index_result]=parseFloat(value_rate);  
              index_result +=1;
            }
        }
      }
  }
  var inputFile='BTC-EUR.csv';
    // read contents of the file
    const entrada_texto = fs.readFileSync(inputFile, 'UTF-8');
    // split the contents by new line
    const lines = entrada_texto.split(/\r?\n/);
    // print all lines
    var index=0;
    var cotizaciones_pasadas=[];
    var volumen_mercado =[];
    var apertura =[];
    var highVal=[];
    var lowVal =[];
    var j=0;
    lines.forEach((line) => {
        //console.log(line);
        if(index!=0){
        var datos = line.split(',');
        if(datos[6] !=undefined){
          cotizaciones_pasadas[j] =parseFloat(datos[5]);
          volumen_mercado[j]=parseFloat(datos[6]);
          apertura[j]=parseFloat(datos[1]);
          highVal[j]=parseFloat(datos[2]);
          lowVal[j]=parseFloat(datos[3]);
          j +=1;
          }
        }
        index +=1;
    });
    var data_test_input =[];
    var trainingData =[];
    var traingDataEstimacion =[];
    for (var j=0;j<=cotizaciones_pasadas.length-1;j++){
      var data_fila={};
      var index_volumen = j-1;
      var cot_pas=cotizaciones_pasadas[j];
      var volum_dia =volumen_mercado[j];
      trainingData[j]=Math.round(cot_pas);
      traingDataEstimacion[j]=[Math.round(apertura[j]),Math.round(highVal[j]),Math.round(lowVal[j]),Math.round(cotizaciones_pasadas[j]),Math.round(volumen_mercado[j])]
      if(j==0){
        index_volumen =0;
      }
      var accion_realizada;
      var string_accion;
      var volum_anterior = volumen_mercado[index_volumen];
      //si ese dia ha habido mas volumen de mercado que el anterior, ha habido mas VENTAS =1
      if(volum_anterior <volum_dia){
        accion_realizada=1;
        string_accion ="venta";
      }else{
        accion_realizada=1;
        string_accion ="compra";
      }
      data_fila["input"] = {cotizacion:cot_pas};
      var object = {};
      object[string_accion] = 1;
      data_fila["output"] = object;
      data_test_input[j]=data_fila;
    }
    const net = new brain.NeuralNetwork();
    var trainingData1=[];
    var index_max =trainingData.length/12;
    net.train(data_test_input);
    var ultimo_dato = result[0];
    const output = net.run({cotizacion:ultimo_dato}); 
    var data_enviar={};
    data_enviar["ultimo_valor"]=ultimo_dato;
    data_enviar["evaluacion"]=output;
    //Red Neuronal de prevision y calculo




    res.json(data_enviar);  
  }).sort({_id: -1}).limit(1);
};

exports.updateBTCJson = function(req, res) {
  var request = require('request');
  var hasta = Math.round(+new Date()/1000);
  var d = new Date();
  d.setDate(d.getDate() - 1000);
  var desde = Math.round(+d/1000);
  console.log(desde);
  var url_get="https://query1.finance.yahoo.com/v7/finance/download/BTC-EUR?interval=1d&events=history"+"&period1="+desde+"&period2="+hasta;

  var options = {
    'method': 'GET',
    'url': url_get,
  };
  request(options, function (error, response) { 
    if (error){
      throw new Error(error)
    }
    var server_string = response.body; 
    const arr = csv.parse(server_string);
    const str = csv.stringify(arr);
    var lines=str.split("\n");
    var result = [];
    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }
  var json_string= JSON.stringify(result);
  var route_file="cotizaciones.json";
  fs.writeFile(route_file, json_string, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  }); 
    res.send('File is created successfully');
  });

};