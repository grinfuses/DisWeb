'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Any = new Schema({
  any: {
    type: { String: Number }
  } // "any" will be Mixed - everything inside is ignored.
});
var RegistroSchema = new Schema({
  timestamp: {
    type: Date
  },
  currency:{
    type: String
  },
  rates:{
  }
});

module.exports = mongoose.model('Registros', RegistroSchema);
