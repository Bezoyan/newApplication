const BaseValidator = require('./base');

const Utility = require('./../utility');
const AppConstants = require('./../settings/constants');

class PasswordValidator extends BaseValidator {
  constructor() {
    super();
  }

    validatePassword(password, sanitize) {

      if (!password) {
          return Utility.ErrorTypes.USERNAME_PASS_MISSING;
      }
      if (password.length < AppConstants.PASSWORD_MIN_LENGTH
        || password.length > AppConstants.PASSWORD_MAX_LENGTH)
    {
            Utility.ErrorTypes.INVALID_PASSWORD_RANGE;
    }

    return Utility.ErrorTypes.SUCCESS;


    //TODO hashing
  }

  module.exports = new PasswordValidator();
