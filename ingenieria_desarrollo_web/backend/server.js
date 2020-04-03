var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/backendModel'), //created model loading here
  Auth = require('./api/models/authModel'), //created model loading here
  jwt = require('jsonwebtoken'),
  config = require('./config'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/backendDB',{useNewUrlParser: true,useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/backendRoutes'); //importing route
routes(app); //register the route



app.listen(port);

console.log('backend Rest API server started on: ' + port);
