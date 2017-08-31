const queryParser = require('../query-parser');
const models   = require('../../db/models');
const Day      = require('../resources').DayResources.Day;
const DaysList = require('../resources').DayResources.DaysList;
const errors = require('../errors');

/**
 * List all days.
 *
 * @method list
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.list = function get(req, res, next) {
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  const query = queryParser.findAndCountAll(req.query, limit);
  models.Day.findAndCountAll(query)
    .then(result => {
      const days = result.rows.map(day => {
        return new Day(day.dataValues);
      });
      const resource = new DaysList(req.originalUrl, days, currentPage, limit, result.count);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Retrieve a specific day
 *
 * @method get
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.get = function find(req, res, next) {
  models.Day.findById(req.params.id)
    .then(day => {
      if (!day) throw new errors.NotFound();
      const resource = new Day(day.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};
