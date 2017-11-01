const BaseValidator = require('./base');

const Utility = require('./../utility');
const AppConstants = require('./../settings/constants');
class EmailValidator extends BaseValidator {
    constructor() {
      super();
    }


validateEmail(email) {
  if (!super.validateEmaill(email, BaseValidator.Types.STRING))
  {
    return false;
  }

    if(!email)
    return false;

    let EmailRegExp = let EmailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(EmailRegExp.test(email))
      return true;
      else
		return false;

    }
}

  module.exports = new EmailValidator();
