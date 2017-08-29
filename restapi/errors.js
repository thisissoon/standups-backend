const HAL = require('hal');

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
    this._errors = err.toJSON();
  }
}
exports.HalErrors = HalErrors;