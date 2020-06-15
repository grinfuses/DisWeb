'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var carteraSchema = new Schema({
  username: {
    type: String
  },
  rates:{
  }

  
});

module.exports = mongoose.model('Cartera', carteraSchema);
