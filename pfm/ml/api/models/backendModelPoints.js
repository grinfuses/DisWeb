'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NubePuntosSchema = new Schema({
  timestamp: {
    type: Date
  },
  originalPoints:{
  },
  predictedPoints:{
  }
});
module.exports = mongoose.model('NubePuntos', NubePuntosSchema);
