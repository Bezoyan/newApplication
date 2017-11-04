const mongoose = require('mongoose');
const keygen = require('keygenerator');
const Schema = mongoose.Schema;

const AppConstants = require('./../settings/constants');

function generateAPIKey() {
  return (keygen._({length: 3}) + '-' + keygen._({length: 7})
      + '-' + keygen.number()
      + '-' + keygen._({length: 10})).replace(/&/g, '');
}

let UsersSchema = mongoose.Schema({
    key: {
      type: String,
      default: generateAPIKey,
      index: true
    },
    username: {
      type: String,
      index: {unique: true},
      minlength: AppConstants.USERNAME_MIN_LENGTH,
      maxlength: AppConstants.USERNAME_MAX_LENGTH
   },
    password:{
      type: String,
      minlength: AppConstants.PASSWORD_MIN_LENGTH,
      maxlength: AppConstants.PASSWORD_MAX_LENGTH
    },

    email: {
      type: String,
      lowercase: true,
      minlength: AppConstants.EMAIL_MIN_LENGTH,
      maxlength: AppConstants.EMAIL_MAX_LENGTH
      //TODO: email validation in services
    },

    name: {
      type: String,
      minlength: AppConstants.NAME_MIN_LENGTH,
      maxlength: AppConstants.NAME_MAX_LENGTH,
      default: null
    },

    age: {
        type: Number,
        minvalue: AppConstants.AGE_MIN_VALUE,
        maxvalue: AppConstants.AGE_MAX_VALUE,
        default: null
    },

    role: {
      type: String,
      enum:['user', 'admin'],
      default: 'user'
    }
  });


  module.exports = mongoose.model('users', UsersSchema);
