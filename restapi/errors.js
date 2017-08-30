const HAL = require('hal');
const ValidationError = require('sequelize/lib/errors').ValidationError;

/**
 * Extendable default Error class
 *
 * @class CustomError
 * @extends {Error}
 */
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = 500;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }

  toJSON() {
    return {
      message: this.message
    };
  }
}

/**
 * Error with 404 status
 *
 * @class NotFound
 * @extends {CustomError}
 */
class NotFound extends CustomError {
  constructor() {
    super('Not Found');
    this.status = 404;
  }
}
exports.NotFound = NotFound;


/**
 * HAL error map
 *
 * @class HalErrors
 * @extends {HAL.Resource}
 */
class HalErrors extends HAL.Resource {

  /**
   * Creates an instance of Errors.
   *
   * @param {Object} req   Express Request
   * @param {Error}  err   Error
   */
  constructor(req, err) {
    super({}, req.originalUrl);
    if (err instanceof CustomError) {
      this._errors = err.toJSON();
    } else if (err instanceof ValidationError) {
      this._errors = {
        message: err.message,
        errors: err.errors.reduce((sum, value) => {
          sum[value.path] = value.message;
          return sum;
        }, {})
      };
    } else if (err instanceof Error) {
      this._errors = { message: err.message };
    }
  }
}
exports.HalErrors = HalErrors;