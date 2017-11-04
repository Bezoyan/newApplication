const AppConstants = require ('./../settings/constants');

const ErrorTypes = {
  SUCCESS: 'success',
  VALIDATION_ERROR: 'validation_error',
  USERNAME_MISSING: 'username_missing',
  PASSWORD_MISSING: 'password_missing',
  INVALID_USERNAME_RANGE: 'invalid_username_range',
  INVALID_PASSWORD_RANGE: 'invalid_password_range',
  USER_CREATION_ERROR: 'user_creation_error',
  USER_ALREADY_EXISTS: 'user_already_exists',
  INVALID_EMAIL:'invalid_email',
  INVALID_AGE_RANGE: 'invalid_age_range',
  USER_DOES_NOT_EXIST: 'user_does_not_exist',
  DELETING_FAILD: 'deleting faild',
  PERMISSION_DENID: 'permission_denid',
  NAME_MISSING: 'name_missing',
  UNKNOWN_ERROR: 'unknown_error'
};
class Utility {
    static parseQuery(req, res, next) {
        req.query.offset = parseInt(req.query.offset);
        if (!isFinite(req.query.offset)) {
            req.query.offset = AppConstants.OFFSET_DEFAULT_VALUE;
        }

        req.query.limit = parseInt(req.query.limit);
        if (!isFinite(req.query.limit)) {
            req.query.limit = AppConstants.LIMIT_DEFAULT_VALUE;
        }
        next();
    }

  static generateErrorMessage (type, message, options) {
      options = options || {};
      let error_object = {
        type: type || ErrorTypes.UNKNOWN_ERROR,
        message: 'Somtyhing went wrong'
      }
      switch (type) {
        case ErrorTypes.USERNAME_MISSING:
            error_object.message = 'Username is not spesified'
            break;
        case ErrorTypes.PASSWORD_MISSING:
            error_object.message = 'Password is not spesified'
            break;
        case ErrorTypes.INVALID_USERNAME_RANGE:
            error_object.message = 'Invalid min/max value for username, must be >= {min} and <= {max}'
            .replace('{min}', AppConstants.USERNAME_MIN_LENGTH)
            .replace('{max}', AppConstants.USERNAME_MAX_LENGTH);
            break;
        case ErrorTypes.INVALID_PASSWORD_RANGE:
            error_object.message = 'Invalid min/max value for password, must be >= {min} and <= {max}'
            .replace('{min}', AppConstants.PASSWORD_MIN_LENGTH)
            .replace('{max}', AppConstants.PASSWORD_MAX_LENGTH);
            break;
        case ErrorTypes.USER_CREATION_ERROR:
            error_object.message = 'Failed to create a user';
            break;
        case ErrorTypes.INVALID_EMAIL:
            error_object.message = 'email is not correct';
          break;
        case ErrorTypes.INVALID_AGE_RANGE:
            error_object.message = 'age does not match';
            break;
        case ErrorTypes.USER_DOES_NOT_EXIST:
            error_object.message = 'user does not exist';
            break;
        case ErrorTypes.DELETING_FAILD:
            error_object.message = 'deleting is faild';
            break;
        case ErrorTypes.PERMISSION_DENID:
            error_object.message = 'You must be registrate';
            break;
        case ErrorTypes.NAME_MISSING:
            error_object.message = 'name is missing';
            break;
        case ErrorTypes.INVALID_NAME_RANGE:
            error_object.message = 'invalid name range';
            break;
          }
            return error_object;
    }
}

module.exports = Utility;
module.exports.ErrorTypes = ErrorTypes;
