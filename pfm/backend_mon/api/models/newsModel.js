'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var noticiasSchema = new Schema({
  timestamp: {
    type: Date
  },
  title:{
    type: String
  },
  body:{
    type: String
  },
  
});

module.exports = mongoose.model('Noticias', noticiasSchema);
