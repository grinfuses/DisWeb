'use strict';
const _ = require('lodash');
let nodemailer = require("nodemailer");

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

exports.updateNoticias = function(req, res) {
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://es.cointelegraph.com/rss/tag/blockchain',
    'headers': {
    }
  };
  
  var data = request(options, function (error, response) { 
    var xml_response = data.responseContent.body;
    if (error) throw new Error(error);
    let list_noticias =[];
    var parseString = require('xml2js').parseString;
    parseString(xml_response, function (err, result) {
      //console.log(result.rss.channel[0].item);
        list_noticias=result.rss.channel[0].item;
        //console.log(result.rss.channel[0].item[0]);
        for(var i=0;i<=result.rss.channel[0].item.length-1;i++){
          var title = result.rss.channel[0].item[i].title[0];
          var description=result.rss.channel[0].item[i].description[0];
          var descripcion_recortada = description.match(/<p>(.*?)<\/p>/g).map(function(val){
            return val.replace(/<\/?p>/g,'');
         });
          var date = new Date();
          // console.log(title);
          // console.log(descripcion_recortada[0]);
          // console.log(date);
          var data={};
          data.title=title;
          data.body=descripcion_recortada[0];
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
      var fecha_hasta = new Date();
      var fecha_desde = new Date();
      var pastDate = fecha_desde.getDate() - 1;
      fecha_desde.setDate(pastDate);
      console.log(fecha_desde);
      console.log(fecha_hasta);
      var noticias = getNoticias();
      var registros = getRegistros();
      var usuario = getUsuario()
      let not;
      let reg;
      let usr;
     noticias.then(function(result) {
      //console.log(result)
      not=result;
   }).then(function(result) {
        registros.then(function(result) {
          reg = result;
        })}).then(function(result) {
          usuario.then(function(result) {
            usr = result;
          }).then(function(result) {
            console.log(reg);
            console.log(not);
            console.log(usr);
            var cotizacion_btc_ayer = reg[0].rates.BTC;
            var cotizacion_btc_hoy = reg[1].rates.BTC
            var cotizacion_eth_ayer = reg[0].rates.ETH;
            var cotizacion_eth_hoy = reg[1].rates.ETH;
            var cotizacion_btc_ayer = reg[0].rates.BTC;
            var cotizacion_btc_hoy = reg[1].rates.BTC
            var cotizacion_eth_ayer = reg[0].rates.ETH;
            var cotizacion_eth_hoy = reg[1].rates.ETH;
            var noticia1_titulo= not[0].title;
            var noticia1_cuerpo= not[0].body;
            var noticia2_titulo= not[1].title;
            var noticia2_cuerpo= not[1].body;
            var noticia3_titulo= not[2].title;
            var noticia3_cuerpo= not[2].body;
            var noticia4_titulo= not[3].title;
            var noticia4_cuerpo= not[3].body;
            var noticia5_titulo= not[4].title;
            var noticia5_cuerpo= not[4].body;
            var string_correo="";
            string_correo +="<p>"+"<br>Últimas cotizaciones de monedas</br>"+"</p>"
            string_correo +="<p>"+"BitCoin"+"</p>"
            string_correo +="<p> Ayer "+Math.round(cotizacion_btc_ayer, 2)+" €</p>"
            string_correo +="<p> Hoy "+Math.round(cotizacion_btc_hoy, 2)+" €</p>"
            string_correo +="<p>"+"Ethereum"+"</p>"
            string_correo +="<p> Ayer "+Math.round(cotizacion_eth_ayer, 2)+" €</p>"
            string_correo +="<p> Hoy "+Math.round(cotizacion_eth_hoy, 2)+" €</p>"
            string_correo+="<br>Últimas Noticias</br>";
            string_correo +="<p> - "+noticia1_titulo+"</p>"
            string_correo +="<p>"+noticia1_cuerpo+"</p>"
            string_correo +="<p> - "+noticia2_titulo+"</p>"
            string_correo +="<p>"+noticia2_cuerpo+"</p>"
            string_correo +="<p> - "+noticia3_titulo+"</p>"
            string_correo +="<p>"+noticia3_cuerpo+"</p>"
            string_correo +="<p> - "+noticia4_titulo+"</p>"
            string_correo +="<p>"+noticia4_cuerpo+"</p>"
            string_correo +="<p> - "+noticia5_titulo+"</p>"
            string_correo +="<p>"+noticia5_cuerpo+"</p>"
            console.log(string_correo);
            var mails_usuarios=[];
            var keys_users = Object.keys(usr);
            for(var i=0;i<=keys_users.length-1;i++){
              //console.log(usr[i].email);
              mails_usuarios[i]=usr[i].email;
            } 
            console.log(mails_usuarios);
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "servidor.pfm@gmail.com",
                pass: "prueba1234"
              }
            });
            
           var mailOptions = {
              to: "servidor.pfm@gmail.com",
             from: 'servidor.pfm@gmail.com',
             bcc: mails_usuarios,
             subject: 'Servicio de Notificaciones y alertas',
             html: string_correo
            };
            transporter.sendMail(mailOptions, function(err) {
              if(err){
                res.send({
                  message: "Error durante el envio del email"
                });
              }else{
              console.log('sent')
            }});
            // montar ahora el envio
            })
        
        });
   
      
 };
async function getNoticias(){
      var noticias;
      await Noticias.find({}, function(err,not){
        noticias=not;
      }).sort({_id: -1}).limit(5);
      return noticias;
    }

    async function getRegistros(){
      var registros;
      await Registros.find({}, function(err,not){
        registros=not;
      }).sort({_id: -1}).limit(2);
      return registros;
    }
    async function getUsuario(){
      var usuarios;
      await Usuario.find({novedades:true}, function(err,not){
        usuarios=not;
      }).sort({_id: -1}).limit(2);
      return usuarios;
    }