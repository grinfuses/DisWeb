'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Username'
  },
  password: {
    type: String,
    required: 'Password'
  },
  token:{
    type: String,
  }
});

module.exports = mongoose.model('User', UserSchema);
