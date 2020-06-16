'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RegistroSchema = new Schema({
  timestamp: {
    type: Date
  },
  pendiente:{
    type: String
  },
  nplus:{
    type: String
  }
});
module.exports = mongoose.model('Registros', RegistroSchema);
