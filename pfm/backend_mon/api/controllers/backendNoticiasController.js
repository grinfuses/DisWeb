'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
  config = require('../../config'),
  Noticias = mongoose.model('Noticias'),
  Usuario = mongoose.model('Usuarios'),
  Registros = mongoose.model('Registros');

exports.getNoticias = function(req, res) {
  Noticias.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  }).sort({_id: -1})
  .limit(5);;
};

//Mejorar, no añade sobre el mismo elemento, sino que crea uno nuevo
exports.updateNoticias = function(req, res) {
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://www.coindesk.com/feed',
    'headers': {
    }
  };
  
  var data = request(options, function (error, response) { 
    //console.log(data.responseContent.body);
    var xml_response = data.responseContent.body;
    if (error) throw new Error(error);
    let list_noticias =[];
    var parseString = require('xml2js').parseString;
    parseString(xml_response, function (err, result) {
        list_noticias=result.rss.channel[0].item;
        //console.log(result.rss.channel[0].item[0]);
        for(var i=0;i<=result.rss.channel[0].item.length-1;i++){
          var title = result.rss.channel[0].item[i].title[0];
          var description=result.rss.channel[0].item[i].description[0];
          var date = new Date();
          // console.log(title);
          // console.log(description);
          // console.log(date);
          var data={};
          data.title=title;
          data.body=description;
          data.timestamp=date;
          var new_task = new Noticias(data);
          new_task.save(function(err, news) {
            if (err)
              console.log("Error updating news");
            console.log(news);
          });
        }
          
      });
      
  
  
  });  
};


    exports.deleteAllNoticias = function(req, res) {
      Noticias.deleteMany({}, function(err, task) {
        if (err)
          res.send(err);
        res.json({ message: 'All noticias successfully deleted' });
      });
    };

    exports.createDailyNewsletter = function(req, res) {
      //lista de emails a enviar de usuarios
      //lista de ultimas noticias
      //lista de ultimas cotizaciones de las 10 más importantes
      //formar el mail
      //enviarlo
      

      // Noticias.find({}, function(err, task) {
      //   if (err){
      //     res.send(err);
      //   }
      //   return task;
      // }).sort({_id: -1})
      // .limit(5);
      
      var fecha_hasta = new Date();
      var fecha_desde = new Date();
      var pastDate = fecha_desde.getDate() - 1;
      fecha_desde.setDate(pastDate);
      Registros.find({}, function(err, reg) {
         
          
        }).sort({_id: -1})
        .limit(2);
        console.log(fecha_desde);
        console.log(fecha_hasta);
        console.log(user);
  

    };