'use strict';
var mongoose = require('mongoose');
var mongooseToCsv=require('mongoose-to-csv');
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
RegistroSchema.plugin(mongooseToCsv, {
  headers: 'Fecha Valor',
});


module.exports = mongoose.model('Registros', RegistroSchema);
