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
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const offset = (page - 1) * limit;
  models.Day.findAndCountAll({ order, limit, offset })
    .then(result => {
      const days = result.rows.map(day => {
        return new Day(day.dataValues);
      });
      const resource = new DaysList(req.originalUrl, days);
      resource.currentPage = page;
      resource.limt = limit;
      resource.total = result.count;
      resource.pages = Math.ceil(result.count / limit);
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
