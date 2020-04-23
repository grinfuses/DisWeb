'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioSchema = new Schema({
  name:{
    type: String
  },
  surname:{
    type: String
  },
  username: {
    type: String
  },
  password:{
    type: String
  },
  email:{
    type: String
  },
  
});

module.exports = mongoose.model('Usuarios', usuarioSchema);
