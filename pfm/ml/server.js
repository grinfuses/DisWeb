var cors = require('cors');
let nodemailer = require("nodemailer");
const cron = require("node-cron");

var express = require('express'),
  app = express(),
  port = process.env.PORT || 1994,
  TaskControllers = require('./api/controllers/backendController'), 
  config = require('./config'),
  bodyParser = require('body-parser');

  app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/backendRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Machine Learning Predictor Rest API server started on: ' + port);
