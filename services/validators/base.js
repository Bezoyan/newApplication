const Types = {
  STRING: 'string',
  NUMBER: 'number',
  SYMBOL: 'symbol'
};

class BaseValidator {

  constructor() {
    this.handlers = {};
    this.handlers[Types.STRING] = this._isString;
    this.handlers[Types.NUMBER] = this._isNumber;
    this.handlers[Types.SYMBOL] = this._isSymbol;

  }

  validate(str, type) {
    if(!this.handlers[type]) {
      return false;
    }
      return this.handlers[type](str);
  }

//check is string
  _isString(str)
  {
    let reg = new RegExp("^([a-z0-9]{5,})$");
    if (reg.test(str))
		return true;
    else
		return false;
  }
  //check is number
  _isNumber(num)
  {
    let numberRegExp = /^[+-]?(([0-9])+([.][0-9]*)?|[.][0-9]+)$/;
    if(!numberRegExp.test(num))
		return false;
  }

  _isSymbol(sym)
  {
    let symbolRegExp = /^[!@#\$%\^\&*\)\(+=~._-]+$/;
    if(!symbolRegExp.test(sym))
		return false;
  }

}

module.exports = BaseValidator;
module.exports.Types = Types;
