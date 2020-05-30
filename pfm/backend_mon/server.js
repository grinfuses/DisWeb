var cors = require('cors');
let nodemailer = require("nodemailer");
const cron = require("node-cron");
const bcrypt = require("bcryptjs");

var express = require('express'),
  app = express(),
  port = process.env.PORT || 1988,
  mongoose = require('mongoose'),
  Task = require('./api/models/backendModel'), //created model loading here
  TaskControllers = require('./api/controllers/backendController'), //created controllers loading here
  Users = require('./api/models/usuariosModel'), //created model loading here
  UsersControllers = require('./api/controllers/backendUsersController'), //created controllers loading here
  Cartera = require('./api/models/carteraModel'), //created model loading here
  CarteraControllers = require('./api/controllers/backendCarteraController'), //created controllers loading here
  Noticias = require('./api/models/newsModel'), //created model loading here
  NoticiasControllers = require('./api/controllers/backendNoticiasController'), //created controllers loading here


  jwt = require('jsonwebtoken'),
  config = require('./config'),
  bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pfmDB',{useNewUrlParser: true,useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/backendRoutes'); //importing route
routes(app); //register the route

// create mail transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "servidor.pfm@gmail.com",
    pass: "prueba1234"
  }
});

//  // run the function 00:00:00 hour 
 cron.schedule("30 1 * * *", function(){
  console.log("---------------------");  
  console.log("Updating Db");
    TaskControllers.updateDbCron();
    NoticiasControllers.updateNoticias();
    let mailOptions = {
      from: "servidor.pfm@gmail.com",
      to: "grinfuses@gmail.com",
      subject: `Base de datos actualizada ;)`,
      text: `Se ha actualizado la base de datos `
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email enviado!");
      }
    });
    console.log("---------------------");
    console.log("Db updated");
});


app.listen(port);

console.log('backend Rest API server started on: ' + port);
