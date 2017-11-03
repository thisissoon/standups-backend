const queryParser = require('../query-parser');
const resources = require('../resources');
const errors = require('../errors');

/**
 * Create a day, positions and summaries from one 'standup' object.
 *
 * @method create
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.create = function create(req, res, next) {
  res.status(201).json([{'message': 'created'}]);
};