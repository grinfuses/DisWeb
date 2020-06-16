'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RegistroSchema = new Schema({
  timestamp: {
    type: Date
  },
  pendiente:{
    type: Number
  },
  nplus:{
    type: Number
  }
});
module.exports = mongoose.model('Registros', RegistroSchema);
