'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['ready', 'pending', 'blocked']
    }],
    default: ['pending']
  },
  token:{
    type: String,
    required: 'Kindly enter the name of the task'
  }
});

module.exports = mongoose.model('User', UserSchema);
