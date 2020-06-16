var cors = require('cors');
let nodemailer = require("nodemailer");
const cron = require("node-cron");

var express = require('express'),
  app = express(),
  port = process.env.PORT || 1994,
  mongoose = require('mongoose'),
  Task = require('./api/models/backendModel'), //created model loading here
  Nube = require('./api/models/backendModelPoints'), //created model loading here
  TaskControllers = require('./api/controllers/backendController'), 
  config = require('./config'),
  bodyParser = require('body-parser');

  app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pfmDB',{useNewUrlParser: true,useUnifiedTopology: true });

var routes = require('./api/routes/backendRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Machine Learning Predictor Rest API server started on: ' + port);
