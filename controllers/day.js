const models   = require('../models');
const Day      = require('../resources').DayResources.Day;
const DaysList = require('../resources').DayResources.DaysList;

/**
 * 
 * @param {String} string Sort string from request URL 
 */
function parseOrder(string) {
  const array = string.split(':');
  array[1] = array[1].toUpperCase();
  return [array];
}

/**
 * List all days.
 *
 * @method list
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.list = function get(req, res, next) {
  const order = req.query.sort ? parseOrder(req.query.sort) : null;
  const limit = req.query.limit;
  const offset = (req.query.page - 1) * limit;
  models.Day.findAll({ order, limit, offset })
    .then(days => {
      days = days.map(day => {
        return new Day(day.dataValues);
      });
      const resource = new DaysList(req.originalUrl, days);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

exports.get = function find(req, res) {
  models.Day.findById(req.params.id)
    .then(day => {
      const resource = new Day(day.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
