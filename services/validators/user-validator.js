//const bleach = require('bleach')
const BaseValidator = require('./base');

const Utility = require('./../utility');
const AppConstants = require('./../../settings/constants');

class UserValidator extends BaseValidator {
  constructor() {
    super();
  }

  validateUsername(username, sanitize) {
      if (!username) {
        return Utility.ErrorTypes.USERNAME_MISSING;
    }

    if (username.length < AppConstants.USERNAME_MIN_LENGTH
        ||username.length > AppConstants.USERNAME_MAX_LENGTH)
    {
         return Utility.ErrorTypes.INVALID_USERNAME_RANGE;
    }
    //TODO
    if (sanitize) {
      _sanitizeUsername(username);
    }
    return Utility.ErrorTypes.SUCCESS;
}

    validatePassword(password, sanitize) {
      if(!password) {
        return Utyility.ErrorTypes.PASSWORD_MISSING;
      }
      if (password.length < AppConstants.PASSWORD_MIN_LENGTH
        || password > AppConstants.PASSWORD_MAX_LENGTH) {
          return Utylity.ErrorTypes.INVALID_PASSWORD_RANGE;
        }
        return Utylity.ErrorTypes.SUCCESS;
    }

    validateName(name, sanitize) {
      if (!name) {
           return Utility.ErrorTypes.NAME_MISSING;
      }
      if (password.length < AppConstants.NAME_MIN_LENGTH
          || password.length > AppConstants.NAME_MAX_LENGTH)
                {
          return Utility.ErrorTypes.INVALID_NAME_RANGE;
      }
       return Utility.ErrorTypes.SUCCESS;
    }

  }

module.exports = new UserValidator();
